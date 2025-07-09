from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import numpy as np
import re

app = Flask(__name__)
CORS(app)

# Load property data from data.csv
DATA_CSV = os.path.join(os.path.dirname(__file__), 'data.csv')

# Columns in data.csv:
# Property_Name,Property Title,Price,Location,Total_Area(SQFT),Price_per_SQFT,Description,Total_Rooms,Balcony,city,property_type,BHK

def load_properties():
    df = pd.read_csv(DATA_CSV)
    # Clean up: fill missing values, ensure correct types
    df['Price'] = pd.to_numeric(df['Price'], errors='coerce').fillna(0)
    df['Total_Area(SQFT)'] = pd.to_numeric(df['Total_Area(SQFT)'], errors='coerce').fillna(0)
    df['BHK'] = pd.to_numeric(df['BHK'], errors='coerce').fillna(0)
    df['Price_per_SQFT'] = pd.to_numeric(df['Price_per_SQFT'], errors='coerce').fillna(0)
    df['Total_Rooms'] = pd.to_numeric(df['Total_Rooms'], errors='coerce').fillna(0)
    df['Description'] = df['Description'].fillna('')
    return df

# Simple keyword-based NLP for locality features
FEATURE_KEYWORDS = {
    'safety': [r'safe', r'security', r'gated', r'guard', r'cctv'],
    'affordability': [r'affordable', r'budget', r'low price', r'cheap', r'value for money'],
    'cleanliness': [r'clean', r'well[- ]?maintained', r'hygienic', r'neat'],
    'commute': [r'public transit', r'metro', r'bus', r'commute', r'accessible', r'connectivity', r'transport'],
    'greenery': [r'park', r'green', r'garden', r'tree', r'nature', r'open space'],
    'nightlife': [r'nightlife', r'restaurant', r'cafe', r'bar', r'entertainment', r'social'],
    'quiet': [r'quiet', r'peaceful', r'serene', r'calm'],
    'lively': [r'lively', r'vibrant', r'bustling', r'active', r'busy'],
    'family': [r'family', r'kids', r'school', r'child', r'playground', r'community'],
}

# Score a property for each feature based on description and numeric fields

def infer_feature_score(desc, feature):
    desc = desc.lower()
    score = 0
    for kw in FEATURE_KEYWORDS.get(feature, []):
        if re.search(kw, desc):
            score += 1
    return min(score, 3)  # Cap at 3 for keyword matches

def score_property(user, prop):
    desc = str(prop['Description']).lower()
    # For each priority, infer score (1-5)
    scores = {}
    # Safety
    scores['safety'] = 3 + infer_feature_score(desc, 'safety')
    # Affordability: lower price = higher score
    price = prop['Price']
    if price < 5000000:
        scores['affordability'] = 5
    elif price < 10000000:
        scores['affordability'] = 4
    elif price < 20000000:
        scores['affordability'] = 3
    else:
        scores['affordability'] = 2
    scores['affordability'] += infer_feature_score(desc, 'affordability')
    scores['affordability'] = min(scores['affordability'], 5)
    # Cleanliness
    scores['cleanliness'] = 3 + infer_feature_score(desc, 'cleanliness')
    scores['cleanliness'] = min(scores['cleanliness'], 5)
    # Commute
    scores['commute'] = 3 + infer_feature_score(desc, 'commute')
    scores['commute'] = min(scores['commute'], 5)
    # Greenery
    scores['greenery'] = 3 + infer_feature_score(desc, 'greenery')
    scores['greenery'] = min(scores['greenery'], 5)
    # Nightlife
    scores['nightlife'] = 3 + infer_feature_score(desc, 'nightlife')
    scores['nightlife'] = min(scores['nightlife'], 5)
    # Vibe (locality type): match user vibe to keywords
    vibe = user.get('vibe', '').lower()
    vibe_score = 0
    if vibe:
        for v in vibe.split(','):
            v = v.strip()
            vibe_score += infer_feature_score(desc, v)
    # Weighted sum
    priorities = ['safety', 'affordability', 'cleanliness', 'commute', 'greenery', 'nightlife']
    user_weights = {}
    total = 0
    for p in priorities:
        val = int(user.get(p, 3))
        user_weights[p] = val
        total += val
    for p in priorities:
        user_weights[p] /= total if total else 1
    score = sum(user_weights[p] * (scores[p] / 5) for p in priorities)
    # Add bonus for vibe match
    if vibe_score > 0:
        score += 0.05 * vibe_score
    return round(score * 100, 2), scores, vibe_score

def explain_match(user, prop, scores, vibe_score):
    priorities = ['safety', 'affordability', 'cleanliness', 'commute', 'greenery', 'nightlife']
    sorted_p = sorted(priorities, key=lambda p: int(user.get(p, 3)), reverse=True)
    top_p = sorted_p[:2]
    explanations = []
    for p in top_p:
        explanations.append(f"{p.capitalize()} score: {scores[p]}/5")
    if vibe_score > 0:
        explanations.append(f"Matches your preferred locality vibe")
    return ' | '.join(explanations)

def to_native(obj):
    if isinstance(obj, dict):
        return {k: to_native(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [to_native(v) for v in obj]
    elif hasattr(obj, 'item'):
        return obj.item()
    else:
        return obj

@app.route('/match', methods=['POST'])
def match():
    user = request.json
    df = load_properties()
    # Score all properties
    results = []
    for _, row in df.iterrows():
        score, scores, vibe_score = score_property(user, row)
        results.append({
            'Property_Name': row['Property_Name'],
            'Property_Title': row['Property Title'],
            'Price': row['Price'],
            'Location': row['Location'],
            'Total_Area(SQFT)': row['Total_Area(SQFT)'],
            'Description': row['Description'],
            'BHK': row['BHK'],
            'property_type': row['property_type'],
            'matchScore': score,
            'why': explain_match(user, row, scores, vibe_score)
        })
    # Sort by matchScore
    results = sorted(results, key=lambda x: x['matchScore'], reverse=True)
    return jsonify({
        'matches': results[:3],
        'userPreferences': user
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({'status': 'ok', 'service': 'Property Matching Service', 'version': '1.0'})

@app.route('/health', methods=['GET'])
def health():
    try:
        # Check if data.csv exists
        if os.path.exists(DATA_CSV):
            df = pd.read_csv(DATA_CSV)
            return jsonify({
                'status': 'ok',
                'service': 'Property Matching Service',
                'data_file': 'found',
                'properties_count': len(df),
                'version': '1.0'
            })
        else:
            return jsonify({
                'status': 'error',
                'service': 'Property Matching Service',
                'data_file': 'not_found',
                'error': f'data.csv not found at {DATA_CSV}',
                'version': '1.0'
            })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'service': 'Property Matching Service',
            'error': str(e),
            'version': '1.0'
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) 
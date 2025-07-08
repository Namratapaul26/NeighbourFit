# NeighborFit - Neighborhood Matching Platform

## 📄 Assignment Brief

**NeighborFit Project Assignment**

**Project Brief:**
Build a full-stack web application that solves the neighborhood-lifestyle matching problem through systematic research, data analysis, and algorithmic thinking.

### Core Requirements
- **Problem Analysis & Research (50%)**
  - Identify and define the core problem through user research
  - Analyze existing solutions and their gaps
  - Develop hypotheses about user behavior and test them
  - Use data to validate or invalidate your assumptions
- **Technical Problem-Solving (40%)**
  - Design and implement a matching algorithm
  - Handle real-world data collection and processing challenges
  - Build scalable data structures and APIs
  - Solve integration challenges with external data sources
- **Systems Thinking (10%)**
  - Document trade-offs and decision rationale
  - Demonstrate understanding of scalability constraints
  - Show systematic approach to complex problem decomposition

#### Constraints & Problem Parameters
- **Resource Constraints:**
  - Zero budget - solve using only free resources
  - 2-week timeline - scope appropriately
  - Limited data access - be creative with data acquisition
- **Technical Constraints:**
  - Must work with real neighborhood data
  - Must be functional (not just mockups)
  - Must handle edge cases and data inconsistencies

#### Deliverables
- **Technical Implementation:**
  - Functional application with working algorithm
  - Data processing pipeline (however basic)
  - Source code with clear problem-solving documentation
- **Problem-Solving Documentation:**
  - Problem definition and hypothesis formation
  - Research methodology and findings analysis
  - Algorithm design rationale and trade-offs
  - Data challenges encountered and solutions implemented
  - Testing approach and validation results
- **Analysis & Reflection:**
  - Critical evaluation of your solution's effectiveness
  - Identified limitations and their root causes
  - Systematic approach to future improvements
- **Submission Requirements:**
  - GitHub repository with documented code
  - Working deployed application

---

## 🔍 User Research & Analysis

### 👥 Respondent Overview (Google Forms Survey)
- **Total Responses:** 36
- **Dominant Age Group:** 18–25
- **Majority Occupation:** Students and Working Professionals
- **Living Situation:**
  - PG/Hostel: High frequency
  - Own: Moderate
  - Rent: Few
  - Some missing data (1 response)

### 🧠 Top 3 Neighborhood Selection Factors
- **Most Common Priorities:**
  - Safety
  - Cleanliness
  - Proximity to work/college
  - Affordability
  - School/education access
- **Implication:** These are core features in the matching algorithm.

### 🏘️ Preferred Neighborhood Type
- **Most Preferred:** Mixed (some quiet, some active areas)
- **Followed by:** Quiet and residential, then Lively and urban

### 💰 Affordability Importance
- **Majority:** Marked affordability as “Very Important”
- **Implication:** Affordability weight is crucial in the matching algorithm.

### 🚌 Commute Time Importance
- **Dominant Answer:** “Extremely Important”
- **Implication:** Proximity to work/college or transit must heavily influence recommendations.

### 🔄 How People Chose Their Current Neighborhood
- Online platforms (e.g., NoBroker, MagicBricks)
- Word of mouth
- Random exploration
- Real estate agents

### 😕 Disappointment Insights
- **Most said:** “Yes” or “Somewhat” disappointed
- **Common Issues:**
  - Noise levels
  - Dirty environment
  - Lack of shops/services
  - Commute difficulties
  - Unfriendly neighbors
  - Safety concerns
- **Implication:** Use these as negative weights or filter criteria in the matching logic.

### 🧪 Tool Usage Insights
- **Most said:** Yes or Maybe to using a lifestyle-based tool
- **Input Time Willingness:** Majority willing to spend 2–5 minutes or more
- **Implication:** A moderately detailed form is acceptable

### 🧑‍🎓 User Persona: Priya, the Urban Student
- **Age:** 18–25
- **Occupation:** Student
- **Living Situation:** PG/Hostel
- **Top Priorities:**
  - Safety
  - Cleanliness
  - Proximity to college/work
  - Affordability
  - School/education access
- **Preferred Neighborhood:** Mixed (some quiet, some active areas)
- **Disappointments Faced:** Dirty environment, noise, lack of shops
- **Tool Interest:** Likely to use a neighborhood recommendation tool
- **Willing to Spend Time:** 2–5 minutes or more to input preferences

### 🔧 Implications for Website & Algorithm
- Add importance sliders for top factors
- Use a weighted scoring algorithm
- Filter out areas with poor ratings in noise, cleanliness, safety
- Use survey data to simulate real-time matching
- Use Recharts to display trends (e.g., factor popularity, user priorities)

---

## 🚀 Features

- **Smart Matching Algorithm**: Combines weighted scoring, decision trees, and distance calculations
- **Real Data Integration**: Fetches data from multiple sources (crime, real estate, transit, demographics)
- **Interactive Survey**: Comprehensive lifestyle preference collection
- **Analytics Dashboard**: Visual insights with Recharts
- **Interactive Maps**: Property and match locations shown using Leaflet and free geocoding (OpenStreetMap/Nominatim)
- **Scalable Architecture**: Microservices with Node.js backend and Python ML service

## 🎨 UI/UX & Theme

- **Modern, Clean Design**: Inspired by 99acres, with a focus on clarity, trust, and professionalism.
- **Color Palette**: Deep blue (`#0057b8`), white, light gray, gold/orange accents, and neutral grays/black for text.
- **Cards & Sections**: White backgrounds, soft shadows, rounded corners, and clear section separation.
- **Buttons**: Blue with white text, rounded, clear hover and focus states.
- **Navbar**: White, sticky, blue logo, blue/gray links, always readable.
- **Typography**: Modern, readable, clear hierarchy, not overly bold.
- **Responsiveness**: Fully responsive and mobile-friendly.

**To customize the theme:**
- Edit `frontend/tailwind.config.js` for colors.
- Adjust card/button/section classes in `frontend/src/index.css` and page components.

## 🛠 Tech Stack

### Frontend
- **React.js** - Dynamic UI components
- **Tailwind CSS** - Modern styling
- **Formik + Yup** - Form handling and validation
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Leaflet** - Interactive maps (OpenStreetMap)
- **Nominatim Geocoding** - Free address-to-coordinates lookup

### Backend
- **Node.js + Express.js** - RESTful API
- **MongoDB** - Data persistence
- **Mongoose** - ODM for MongoDB

### ML Service
- **Python Flask** - Matching algorithm service
- **scikit-learn** - Machine learning models
- **pandas** - Data processing

## 📋 Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or Atlas)

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd neighborfit

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install Python dependencies
cd ../python-service
pip install -r requirements.txt
```

### 2. Environment Setup

Create `.env` files in the backend directory:

```bash
# backend/.env
MONGODB_URI=mongodb://localhost:27017/neighborfit
```

### 3. Start Services

```bash
# Start all services (from root directory)
npm run dev

# Or start individually:

# Python ML Service (Terminal 1)
cd python-service
python app.py

# Backend API (Terminal 2)
cd backend
npm run dev

# Frontend (Terminal 3)
cd frontend
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Python Service**: http://localhost:8000

## 📊 Data Collection

### Real Data Sources

The application can integrate with real data sources:

1. **Crime Data**: NYC Open Data API
2. **Real Estate**: Zillow API, RentHop API
3. **Transit**: MTA API, Google Transit API
4. **Demographics**: US Census Bureau API
5. **Amenities**: Google Places API

### Run Data Collection

```bash
cd python-service
python data_collector.py
```

This will:
- Fetch data from various APIs
- Process and clean the data
- Calculate derived metrics
- Generate neighborhood profiles
- Update the `neighborhoods.csv` file

## 🔧 API Documentation

### Backend Endpoints

#### POST `/api/submit`
Submit survey and get neighborhood matches.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28,
  "budget": "2000-3000",
  "lifestyle": ["Urban Professional", "Foodie"],
  "safety": 8,
  "cleanliness": 7,
  "affordability": 6,
  "walkability": 9,
  "nightlife": 8,
  "family": "single",
  "commute": "public-transit",
  "amenities": ["Restaurants", "Coffee Shops", "Parks"]
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "topMatch": {
      "name": "Downtown Arts District",
      "matchScore": 87.5,
      "description": "...",
      "features": ["Art Galleries", "Nightlife"],
      "stats": {
        "safety": 8,
        "affordability": 6,
        "walkability": 9,
        "nightlife": 9,
        "averageRent": 2500,
        "distance_km": 2.1
      },
      "matchReasons": [
        "High safety rating matches your top priority.",
        "Great walkability and public transit access."
      ]
    },
    "otherMatches": [...],
    "algorithm_info": {
      "weighted_score": 85.2,
      "ml_score": 89.1,
      "distance_km": 2.1
    }
  }
}
```

#### GET `/api/analytics`
Get survey analytics for dashboard.

#### GET `/api/neighborhoods`
Get all available neighborhoods.

### Python Service Endpoints

#### POST `/match`
Core matching algorithm endpoint.

#### GET `/health`
Service health check.

## 🧠 Matching Algorithm

### 1. Weighted Scoring
- **Safety**: User preference weight × neighborhood safety score
- **Affordability**: Budget compatibility + neighborhood affordability
- **Walkability**: Transit access + amenity density
- **Nightlife**: Entertainment options + restaurant density
- **Cleanliness**: Parks + income level correlation

### 2. Machine Learning
- **Decision Tree Regressor**: Trained on synthetic user-neighborhood pairs
- **Feature Engineering**: Derived metrics from raw data
- **Model Combination**: 70% weighted score + 30% ML prediction

### 3. Distance Calculation
- **Geocoding**: Free address-to-coordinates lookup using Nominatim/OpenStreetMap
- **Map Display**: Interactive maps rendered with Leaflet (OpenStreetMap tiles)
- **Distance Penalty**: 2% score reduction per km beyond 5km

### 4. Lifestyle Matching
- **Feature Matching**: User lifestyle vs. neighborhood features
- **Budget Compatibility**: Rent range analysis
- **Amenity Preferences**: Restaurant, transit, park density

## 📈 Analytics Dashboard

The dashboard provides insights on:
- Survey response trends
- Popular lifestyle preferences
- Factor importance ratings
- Budget distribution
- Top neighborhood matches
- Monthly usage statistics

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Railway)
```bash
cd backend
# Set environment variables
# Deploy to Render or Railway
```

### Python Service (Railway)
```bash
cd python-service
# Deploy to Railway with Python runtime
```

### Database (MongoDB Atlas)
- Create MongoDB Atlas cluster
- Update `MONGODB_URI` in backend environment

## 🔒 Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

### Python Service
- `PORT`: Service port (default: 8000)

## 📝 Project Structure

```
neighborfit/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── index.css       # Tailwind styles
│   └── package.json
├── backend/                 # Node.js API
│   ├── models/             # MongoDB schemas
│   ├── mock/               # Mock data
│   └── server.js           # Express server
├── python-service/         # ML matching service
│   ├── app.py             # Flask application
│   ├── data_collector.py  # Data collection script
│   ├── neighborhoods.csv  # Neighborhood data
│   └── requirements.txt   # Python dependencies
└── package.json           # Root package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed description

## 🔮 Future Enhancements

- [ ] Real-time data updates
- [ ] Advanced ML models (Neural Networks)
- [ ] Mobile application
- [ ] Social features (reviews, ratings)
- [ ] Integration with more data sources
- [ ] Multi-city support
- [ ] Personalized recommendations 
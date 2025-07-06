# NeighborFit - Neighborhood Matching Platform

A full-stack web application that helps users find the most suitable neighborhood based on lifestyle preferences using advanced matching algorithms and real data integration.

## 🚀 Features

- **Smart Matching Algorithm**: Combines weighted scoring, decision trees, and distance calculations
- **Real Data Integration**: Fetches data from multiple sources (crime, real estate, transit, demographics)
- **Interactive Survey**: Comprehensive lifestyle preference collection
- **Analytics Dashboard**: Visual insights with Recharts
- **External API Integration**: Google Maps for distance calculations
- **Scalable Architecture**: Microservices with Node.js backend and Python ML service

## 🛠 Tech Stack

### Frontend
- **React.js** - Dynamic UI components
- **Tailwind CSS** - Modern styling
- **Formik + Yup** - Form handling and validation
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js + Express.js** - RESTful API
- **MongoDB** - Data persistence
- **Mongoose** - ODM for MongoDB

### ML Service
- **Python Flask** - Matching algorithm service
- **scikit-learn** - Machine learning models
- **pandas** - Data processing
- **Google Maps API** - Distance calculations

## 📋 Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or Atlas)
- Google Maps API key (optional)

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
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
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
- **Google Maps API**: Real-time distance calculations
- **Fallback**: Euclidean distance with city center reference
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
- `GOOGLE_MAPS_API_KEY`: Google Maps API key
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
# NeighborFit - Neighborhood Matching Platform

## Assignment Details
**Course:** CS 201 - Data Structures and Algorithms  
**Assignment:** Final Project - Full Stack Web Application  
**Student:** [Your Name]  
**Roll Number:** [Your Roll Number]  
**Submission Date:** [Date]

## Project Overview
NeighborFit is a comprehensive neighborhood matching platform that helps users find their ideal living environment based on lifestyle preferences, budget, and priorities. The application uses machine learning algorithms to match users with suitable neighborhoods and properties.

## User Research Findings
Based on a Google Forms survey with 50+ responses:

### Key Insights:
- **Primary Concerns:** Safety (85%), Affordability (78%), Commute (72%)
- **Age Demographics:** 25-34 age group most active (65%)
- **Occupation:** Professionals (70%) and Students (20%)
- **Living Preferences:** Family units (45%), Couples (30%), Singles (25%)
- **Neighborhood Vibe:** Mixed (50%), Quiet (30%), Lively (20%)

### User Persona: Priya
- **Age:** 28, Software Engineer
- **Location:** Bangalore
- **Priorities:** Safety, commute, affordability
- **Pain Points:** Limited time for property hunting, safety concerns
- **Goals:** Find a safe, well-connected neighborhood within budget

## Tech Stack
- **Frontend:** React.js with Tailwind CSS
- **Backend:** Node.js/Express.js
- **Database:** MongoDB
- **ML Service:** Python Flask
- **Deployment:** Render (Backend/Python), Vercel (Frontend)
- **Mapping:** Leaflet with OpenStreetMap (free geocoding)

## Features
- **Lifestyle Survey:** Comprehensive preference assessment
- **ML-Powered Matching:** Intelligent neighborhood recommendations
- **Interactive Dashboard:** Analytics and insights
- **Responsive Design:** Mobile-first approach
- **Real-time Data:** Live property and survey analytics

## Deployment Guide

### Environment Variables Required

#### Backend (Render)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neighborfit
PORT=5000
PYTHON_SERVICE_URL=https://your-python-service.onrender.com
```

#### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

#### Python Service (Render)
```
PORT=8000
```

### Deployment Steps

1. **Backend Deployment (Render)**
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables

2. **Python Service Deployment (Render)**
   - Connect GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `python app.py`
   - Add environment variables

3. **Frontend Deployment (Vercel)**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Add environment variables
   - Deploy

## Troubleshooting Guide

### Common Deployment Issues

#### 1. Survey Submission Error
**Symptoms:** "There was an error submitting your preferences"
**Causes:**
- Python service not accessible
- Environment variables not set correctly
- Network connectivity issues

**Solutions:**
1. Check Python service health: `GET https://your-python-service.onrender.com/health`
2. Verify `PYTHON_SERVICE_URL` in backend environment variables
3. Check backend logs for connection errors
4. Ensure all services are deployed and running

#### 2. Dashboard Analytics Error
**Symptoms:** "Failed to load analytics"
**Causes:**
- `data.csv` file not accessible in deployment
- Backend cannot read property data
- MongoDB connection issues

**Solutions:**
1. Check if `data.csv` exists in python-service directory
2. Verify MongoDB connection string
3. Check backend logs for file read errors
4. Ensure backend has proper file permissions

#### 3. Environment Variable Issues
**Symptoms:** API calls failing, undefined URLs
**Solutions:**
1. Verify all environment variables are set in deployment platforms
2. Check variable names match exactly (case-sensitive)
3. Ensure no trailing slashes in URLs
4. Test environment variables in deployment logs

### Debugging Steps

1. **Check Service Health:**
   ```bash
   # Backend health
   curl https://your-backend.onrender.com/api/health
   
   # Python service health
   curl https://your-python-service.onrender.com/health
   ```

2. **Check Environment Variables:**
   - Backend: Check Render logs for `PYTHON_SERVICE_URL`
   - Frontend: Check browser console for `REACT_APP_API_URL`

3. **Test API Endpoints:**
   ```bash
   # Test survey submission
   curl -X POST https://your-backend.onrender.com/api/survey \
     -H "Content-Type: application/json" \
     -d '{"ageGroup":"25-34","occupation":"Professional"}'
   
   # Test analytics
   curl https://your-backend.onrender.com/api/analytics
   ```

4. **Check Logs:**
   - Backend: Render dashboard → Logs
   - Python Service: Render dashboard → Logs
   - Frontend: Browser Developer Tools → Console

### File Structure Verification
Ensure these files exist in deployment:
```
python-service/
├── app.py
├── data.csv
└── requirements.txt

backend/
├── server.js
├── models/
│   └── Survey.js
└── package.json

frontend/
├── src/
│   ├── App.js
│   ├── pages/
│   │   ├── Survey.js
│   │   └── Dashboard.js
│   └── components/
└── package.json
```

## Local Development

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or Atlas)

### Setup
1. Clone repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd frontend && npm install
   
   # Python Service
   cd python-service && pip install -r requirements.txt
   ```
3. Set environment variables
4. Start services:
   ```bash
   # Backend (port 5000)
   cd backend && npm start
   
   # Python Service (port 8000)
   cd python-service && python app.py
   
   # Frontend (port 3000)
   cd frontend && npm start
   ```

## API Documentation

### Survey Submission
```
POST /api/survey
Content-Type: application/json

{
  "ageGroup": "25-34",
  "occupation": "Professional",
  "livingType": "Family",
  "vibe": "Mixed",
  "safety": 5,
  "affordability": 4,
  "cleanliness": 3,
  "commute": 5,
  "greenery": 2,
  "nightlife": 3
}
```

### Analytics
```
GET /api/analytics
Returns: Property and survey analytics data
```

### Health Check
```
GET /api/health
Returns: Service status
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License
MIT License - see LICENSE file for details 
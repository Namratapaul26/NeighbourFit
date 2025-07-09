const axios = require('axios');

// Configuration - Update these URLs with your actual deployment URLs
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-backend.onrender.com';
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'https://your-python-service.onrender.com';

async function testBackendHealth() {
  try {
    console.log('🔍 Testing Backend Health...');
    const response = await axios.get(`${BACKEND_URL}/api/health`);
    console.log('✅ Backend Health:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Backend Health Failed:', error.message);
    return false;
  }
}

async function testPythonServiceHealth() {
  try {
    console.log('🔍 Testing Python Service Health...');
    const response = await axios.get(`${PYTHON_SERVICE_URL}/health`);
    console.log('✅ Python Service Health:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Python Service Health Failed:', error.message);
    return false;
  }
}

async function testAnalytics() {
  try {
    console.log('🔍 Testing Analytics Endpoint...');
    const response = await axios.get(`${BACKEND_URL}/api/analytics`);
    console.log('✅ Analytics Response:', {
      totalProperties: response.data.totalProperties,
      surveyCount: response.data.surveyCount,
      hasData: !!response.data
    });
    return true;
  } catch (error) {
    console.log('❌ Analytics Failed:', error.message);
    return false;
  }
}

async function testSurveySubmission() {
  try {
    console.log('🔍 Testing Survey Submission...');
    const testData = {
      ageGroup: '25-34',
      occupation: 'Professional',
      livingType: 'Family',
      vibe: 'Mixed',
      safety: 5,
      affordability: 4,
      cleanliness: 3,
      commute: 5,
      greenery: 2,
      nightlife: 3
    };
    
    const response = await axios.post(`${BACKEND_URL}/api/survey`, testData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Survey Submission Success:', {
      hasResults: !!response.data.matches,
      matchCount: response.data.matches?.length || 0
    });
    return true;
  } catch (error) {
    console.log('❌ Survey Submission Failed:', error.message);
    if (error.response?.data?.error) {
      console.log('Error Details:', error.response.data.error);
    }
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Deployment Debug Tests...\n');
  
  const results = {
    backendHealth: await testBackendHealth(),
    pythonHealth: await testPythonServiceHealth(),
    analytics: await testAnalytics(),
    surveySubmission: await testSurveySubmission()
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('Backend Health:', results.backendHealth ? '✅' : '❌');
  console.log('Python Service Health:', results.pythonHealth ? '✅' : '❌');
  console.log('Analytics:', results.analytics ? '✅' : '❌');
  console.log('Survey Submission:', results.surveySubmission ? '✅' : '❌');
  
  const allPassed = Object.values(results).every(result => result);
  console.log('\n🎯 Overall Status:', allPassed ? '✅ All Tests Passed' : '❌ Some Tests Failed');
  
  if (!allPassed) {
    console.log('\n🔧 Troubleshooting Tips:');
    if (!results.backendHealth) {
      console.log('- Check if backend is deployed and running on Render');
      console.log('- Verify MONGODB_URI environment variable');
    }
    if (!results.pythonHealth) {
      console.log('- Check if Python service is deployed and running on Render');
      console.log('- Verify data.csv file exists in python-service directory');
    }
    if (!results.analytics) {
      console.log('- Check backend logs for file read errors');
      console.log('- Verify data.csv path in backend server.js');
    }
    if (!results.surveySubmission) {
      console.log('- Check PYTHON_SERVICE_URL environment variable in backend');
      console.log('- Verify Python service is accessible from backend');
      console.log('- Check backend logs for connection errors');
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests }; 
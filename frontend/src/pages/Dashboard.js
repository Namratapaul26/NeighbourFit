import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
} from 'recharts';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">Failed to load analytics.</div>
      </div>
    );
  }

  // Prepare data for charts
  const radarData = analytics.avgPriorities
    ? Object.entries(analytics.avgPriorities).map(([key, value]) => ({ factor: key, value: Math.round(value * 100) / 100 }))
    : [];
  const barData = analytics.topDisappointments || [];
  const lineData = analytics.interestTrend || [];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property & User Insights Dashboard</h1>
          <p className="text-lg text-gray-600">Insights from your property and user survey data</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {analytics.totalProperties !== undefined ? analytics.totalProperties.toLocaleString() : 'N/A'}
            </div>
            <div className="text-gray-600">Total Properties</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹{analytics.avgPrice !== undefined ? analytics.avgPrice.toLocaleString() : 'N/A'}
            </div>
            <div className="text-gray-600">Average Price</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {analytics.avgArea !== undefined ? analytics.avgArea.toLocaleString() : 'N/A'} sqft
            </div>
            <div className="text-gray-600">Average Area</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {analytics.topPropertyType || 'N/A'}
            </div>
            <div className="text-gray-600">Most Common Property Type</div>
          </div>
        </div>

        <div className="card mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Cities by Listings</h3>
          <ul className="divide-y divide-gray-200">
            {Array.isArray(analytics.topCities) && analytics.topCities.length > 0 ? (
              analytics.topCities.map((city, idx) => (
                <li key={idx} className="flex justify-between py-2">
                  <span>{city.city}</span>
                  <span className="font-medium">{city.count.toLocaleString()}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No city data available.</li>
            )}
          </ul>
        </div>

        {/* User Survey Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Valued Factors (Avg. Priority)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Priority" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Disappointments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="factor" type="category" width={100} />
                <Bar dataKey="count" fill="#f59e42" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Interest Rate (Survey Submissions Over Time)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#10b981" name="Submissions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Most Commonly Desired Locality Vibe</h3>
          <div className="text-2xl font-bold text-primary-600 mb-2">{analytics.topVibe || 'N/A'}</div>
          <div className="text-gray-600">Based on user survey submissions</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
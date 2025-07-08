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
    <div className="min-h-screen bg-background-50">
      {/* Hero Header */}
      <div className="section bg-gradient-to-r from-primary-500 to-secondary-500 rounded-b-3xl shadow-xl mb-12 flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-14 h-14 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Property & User Insights</h1>
        <p className="text-lg text-accent-100">Insights from your property and user survey data</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card text-center border-l-8 border-primary-500 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">Total Properties</span>
            </div>
            <div className="text-4xl font-extrabold text-primary-600 mb-2">
              {analytics.totalProperties !== undefined ? analytics.totalProperties.toLocaleString() : 'N/A'}
            </div>
          </div>
          <div className="card text-center border-l-8 border-accent-500 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block bg-accent-100 text-accent-700 text-xs font-bold px-3 py-1 rounded-full">Average Price</span>
            </div>
            <div className="text-4xl font-extrabold text-accent-600 mb-2">
              9{analytics.avgPrice !== undefined ? analytics.avgPrice.toLocaleString() : 'N/A'}
            </div>
          </div>
          <div className="card text-center border-l-8 border-secondary-500 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block bg-secondary-100 text-secondary-700 text-xs font-bold px-3 py-1 rounded-full">Average Area</span>
            </div>
            <div className="text-4xl font-extrabold text-secondary-600 mb-2">
              {analytics.avgArea !== undefined ? analytics.avgArea.toLocaleString() : 'N/A'} sqft
            </div>
          </div>
          <div className="card text-center border-l-8 border-primary-700 hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">Top Property Type</span>
            </div>
            <div className="text-3xl font-extrabold text-primary-700 mb-2">
              {analytics.topPropertyType || 'N/A'}
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="card mb-12 border-l-8 border-secondary-500">
          <h3 className="text-2xl font-bold text-secondary-700 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5z" /></svg>
            Top Cities by Listings
          </h3>
          <ul className="divide-y divide-neutral-100">
            {Array.isArray(analytics.topCities) && analytics.topCities.length > 0 ? (
              analytics.topCities.map((city, idx) => (
                <li key={idx} className="flex justify-between py-2 text-lg">
                  <span>{city.city}</span>
                  <span className="font-bold text-primary-600">{city.count.toLocaleString()}</span>
                </li>
              ))
            ) : (
              <li className="text-neutral-400">No city data available.</li>
            )}
          </ul>
        </div>

        {/* User Survey Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card border-l-8 border-accent-500">
            <h3 className="text-xl font-bold text-accent-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
              Most Valued Factors (Avg. Priority)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Priority" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card border-l-8 border-primary-500">
            <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
              Most Common Disappointments
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="factor" type="category" width={100} />
                <Bar dataKey="count" fill="#fbbf24" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card mb-12 border-l-8 border-secondary-500">
          <h3 className="text-xl font-bold text-secondary-700 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
            Tool Interest Rate (Survey Submissions Over Time)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#38bdf8" name="Submissions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card text-center border-l-8 border-accent-500">
          <h3 className="text-xl font-bold text-accent-700 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
            Most Commonly Desired Locality Vibe
          </h3>
          <div className="text-2xl font-extrabold text-accent-600 mb-2">{analytics.topVibe || 'N/A'}</div>
          <div className="text-neutral-600">Based on user survey submissions</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
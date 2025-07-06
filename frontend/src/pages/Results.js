import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Bar = ({ score }) => (
  <div className="w-full bg-gray-200 rounded h-4 mt-2 mb-2">
    <div
      className="bg-primary-600 h-4 rounded"
      style={{ width: `${score}%`, transition: 'width 0.5s' }}
    ></div>
  </div>
);

// Geocode address using Nominatim
const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  }
  return null;
};

const Results = () => {
  const location = useLocation();
  const results = location.state?.results || null;
  const [geoResults, setGeoResults] = useState({});

  useEffect(() => {
    if (!results) {
      // If no results in state, redirect to survey
      window.location.href = '/survey';
    } else {
      // Geocode all matches
      const fetchGeos = async () => {
        const newGeoResults = {};
        for (const match of results.matches || []) {
          // Use only Location + ', India' for geocoding
          const address = match.Location ? `${match.Location}, India` : `${match.Property_Title}, India`;
          if (!geoResults[address]) {
            const geo = await geocodeAddress(address);
            console.log('Geocoding:', address, geo);
            if (geo) newGeoResults[address] = geo;
          }
        }
        if (Object.keys(newGeoResults).length > 0) {
          setGeoResults(prev => ({ ...prev, ...newGeoResults }));
        }
      };
      fetchGeos();
    }
    // eslint-disable-next-line
  }, [results]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  const { matches = [] } = results;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Best Property Matches
          </h1>
          <p className="text-lg text-gray-600">
            Based on your preferences, here are the properties that best fit your lifestyle
          </p>
        </div>

        {/* Matches */}
        <div className="grid md:grid-cols-3 gap-8">
          {matches.map((match, idx) => {
            // Use only Location + ', India' for geocoding
            const address = match.Location ? `${match.Location}, India` : `${match.Property_Title}, India`;
            const geo = geoResults[address];
            return (
              <div key={idx} className={`card border-2 ${idx === 0 ? 'border-primary-600' : 'border-gray-200'} p-6 flex flex-col`}>
                <div className="mb-2 text-lg font-semibold text-gray-900">{match.Property_Title}</div>
                <div className="mb-2 text-gray-700 line-clamp-4">{match.Description}</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">Location:</span> {match.Location}</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">Type:</span> {match.property_type}</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">BHK:</span> {match.BHK}</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">Area:</span> {match['Total_Area(SQFT)']} sqft</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">Price:</span> ₹{match.Price?.toLocaleString()}</div>
                <div className="mb-2 text-sm text-gray-600"><span className="font-medium">Match Score:</span> {match.matchScore}%</div>
                <Bar score={match.matchScore} />
                <div className="mt-2 text-primary-700 text-sm font-medium">{match.why}</div>
                {/* Map integration */}
                {geo ? (
                  <div className="mt-4">
                    <MapContainer center={[geo.lat, geo.lon]} zoom={15} style={{ height: 200, width: '100%' }} scrollWheelZoom={false}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[geo.lat, geo.lon]}>
                        <Popup>
                          {match.Property_Title}<br />{match.Location}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                ) : (
                  <div className="mt-4 text-gray-400 text-sm">Could not locate on map.</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 space-x-4">
          <Link to="/survey" className="btn-secondary inline-block">Search Again</Link>
        </div>
      </div>
    </div>
  );
};

export default Results; 
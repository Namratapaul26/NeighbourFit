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
    <div className="min-h-screen bg-background-50 py-12">
      {/* Celebratory Header */}
      <div className="section bg-gradient-to-r from-primary-500 to-accent-500 rounded-b-3xl shadow-xl mb-12 flex flex-col items-center justify-center py-12">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-14 h-14 text-white drop-shadow-lg animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Your Best Property Matches</h1>
        <p className="text-lg text-accent-100">Based on your preferences, here are the properties that best fit your lifestyle</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Matches */}
        <div className="grid md:grid-cols-3 gap-10">
          {matches.map((match, idx) => {
            // Use only Location + ', India' for geocoding
            const address = match.Location ? `${match.Location}, India` : `${match.Property_Title}, India`;
            const geo = geoResults[address];
            return (
              <div key={idx} className={`card border-4 ${idx === 0 ? 'border-accent-500 shadow-2xl scale-105' : 'border-neutral-100'} p-6 flex flex-col relative transition-transform duration-200 hover:scale-105`}> 
                {idx === 0 && (
                  <span className="absolute top-4 right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">Top Match</span>
                )}
                <div className="mb-2 text-lg font-semibold text-primary-700">{match.Property_Title}</div>
                <div className="mb-2 text-neutral-700 line-clamp-4">{match.Description}</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">Location:</span> {match.Location}</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">Type:</span> {match.property_type}</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">BHK:</span> {match.BHK}</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">Area:</span> {match['Total_Area(SQFT)']} sqft</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">Price:</span> 9{match.Price?.toLocaleString()}</div>
                <div className="mb-2 text-sm text-neutral-600"><span className="font-medium">Match Score:</span> {match.matchScore}%</div>
                {/* Enhanced Bar */}
                <div className="w-full bg-neutral-100 rounded h-4 mt-2 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-4 rounded"
                    style={{ width: `${match.matchScore}%`, transition: 'width 0.5s' }}
                  ></div>
                </div>
                <div className="mt-2 text-primary-700 text-sm font-medium">{match.why}</div>
                {/* Map integration */}
                {geo ? (
                  <div className="mt-4 rounded-xl overflow-hidden border border-neutral-100 shadow">
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
                  <div className="mt-4 text-neutral-400 text-sm">Could not locate on map.</div>
                )}
              </div>
            );
          })}
        </div>
        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Link to="/survey" className="bg-primary-500 hover:bg-accent-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl text-lg transition-all duration-200">
            Search Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results; 
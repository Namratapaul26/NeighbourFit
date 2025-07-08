import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md border-b border-neutral-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-extrabold text-primary-600 tracking-tight">NeighborFit</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
                isActive('/') 
                  ? 'text-primary-600 border-b-4 border-accent-500 bg-accent-50' 
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/survey"
              className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
                isActive('/survey') 
                  ? 'text-primary-600 border-b-4 border-accent-500 bg-accent-50' 
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              Take Survey
            </Link>
            <Link
              to="/dashboard"
              className={`px-5 py-2 rounded-full text-lg font-semibold transition-all duration-200 ${
                isActive('/dashboard') 
                  ? 'text-primary-600 border-b-4 border-accent-500 bg-accent-50' 
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
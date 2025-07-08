import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import propertyImg from '../property.png';

const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m-7-7h14" /></svg>
    ),
    title: 'Trusted Listings',
    desc: 'All properties are verified and updated regularly for your peace of mind.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
    ),
    title: 'Smart Matching',
    desc: 'Our intelligent system finds the best fit for your lifestyle and budget.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-primary-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5z" /></svg>
    ),
    title: 'Verified Agents',
    desc: 'Connect with experienced, trusted agents to guide your journey.'
  },
];

function useFadeInOnMount(ref, delay = 0) {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = 0;
      ref.current.style.transform = 'translateY(40px)';
      setTimeout(() => {
        ref.current.style.transition = 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1)';
        ref.current.style.opacity = 1;
        ref.current.style.transform = 'none';
      }, delay);
    }
  }, [ref, delay]);
}

// Decorative SVG Blob
const Blob = () => (
  <svg className="absolute -top-24 -left-24 w-[480px] h-[480px] opacity-30 z-0" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="240" cy="240" rx="240" ry="200" fill="url(#blobGradient)" />
    <defs>
      <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#f59e42" />
      </linearGradient>
    </defs>
  </svg>
);

const Home = () => {
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  useFadeInOnMount(heroTextRef, 100);
  useFadeInOnMount(heroImgRef, 400);
  return (
    <div className="relative min-h-screen bg-background-50 overflow-x-hidden">
      {/* Navbar space */}
      <div className="h-20" />
      {/* Hero Section */}
      <section className="section flex flex-col md:flex-row items-center justify-center min-h-[60vh] gap-10 bg-background-50 max-w-7xl mx-auto rounded-3xl shadow-lg mt-8 border border-neutral-100">
        <div className="flex-1 flex items-center justify-center">
          <div ref={heroImgRef} className="transition-all duration-1000">
            <div className="relative">
              <img src={propertyImg} alt="Property" className="w-full max-w-md rounded-3xl shadow-xl object-cover border-4 border-background-100" />
            </div>
          </div>
        </div>
        <div ref={heroTextRef} className="flex-1 text-center md:text-left space-y-8 transition-all duration-1000 max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-500 mb-4 tracking-tight leading-tight">
            Find Your Perfect
            <span className="text-accent-500"> Neighborhood</span>
          </h1>
          <p className="text-2xl text-text-100 mb-8 max-w-2xl mx-auto md:mx-0">
            Discover the ideal neighborhood that matches your lifestyle preferences. Our intelligent matching system analyzes your needs and connects you with communities that fit your unique requirements.
          </p>
          <Link
            to="/survey"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-lg font-bold bg-primary-500 text-white shadow-md hover:bg-primary-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-100 border border-primary-500"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            Start Your Journey
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="section max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-500 mb-4">Why Choose NeighborFit?</h2>
          <p className="text-lg text-text-200">We make finding your dream neighborhood easy, safe, and smart.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={f.title} className="bg-background-50 border border-neutral-100 rounded-xl shadow-md flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-200">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-primary-500 mb-2">{f.title}</h3>
              <p className="text-text-200 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* CTA Section */}
      <section className="section bg-accent-50 max-w-4xl mx-auto rounded-3xl shadow-lg mt-12 border border-accent-100">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-primary-500 mb-2">
            Ready to Find Your Perfect Neighborhood?
          </h2>
          <p className="text-2xl text-text-200 mb-8">
            Join thousands of people who have found their ideal community with NeighborFit.
          </p>
          <Link
            to="/survey"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-lg font-bold bg-primary-500 text-white shadow-md hover:bg-primary-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-100 border border-primary-500"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" /></svg>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 
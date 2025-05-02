// src/layouts/EnhancedMainLayout.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedHeader from '../components/common/Header';
import EnhancedFooter from '../components/common/Footer';

const EnhancedMainLayout = ({ children }) => {
  const location = useLocation();

  // Always scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Handle URL hash for scrolling to sections (after scrolling to top)
  useEffect(() => {
    if (location.hash) {
      // First scroll to top
      window.scrollTo(0, 0);
      
      // Then wait a bit for the DOM to fully render
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EnhancedHeader />
      <main className="flex-grow">
        {children}
      </main>
      <EnhancedFooter />
    </div>
  );
};

export default EnhancedMainLayout;
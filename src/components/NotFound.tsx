// src/components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="px-8 py-10 mx-auto text-center bg-gray-700 rounded-2xl shadow-2xl max-w-md border border-gray-600"
      >
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        
        <h1 className="mb-2 text-7xl font-extrabold text-white">404</h1>
        <h2 className="mb-5 text-2xl font-semibold text-gray-300">Page Not Found</h2>
        
        <p className="mb-8 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="group flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors duration-300 shadow-md"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 mr-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
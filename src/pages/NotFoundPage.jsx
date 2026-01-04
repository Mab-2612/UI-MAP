import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-bold text-blue-900 opacity-20">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-[-2rem] mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">It seems you have wandered off the campus map.</p>
      <Link 
        to="/map" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return to Map
      </Link>
    </div>
  );
};

export default NotFoundPage;
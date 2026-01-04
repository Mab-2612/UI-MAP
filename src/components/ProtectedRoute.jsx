import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not logged in? Redirect to Login page.
    return <Navigate to="/login" replace />;
  }

  // User is logged in? Render the page (The Map).
  return children;
};

export default ProtectedRoute;
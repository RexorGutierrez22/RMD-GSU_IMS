import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { adminAuth } from '../services/adminAPI.js';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = adminAuth.getToken();
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Verify token with backend using the adminAPI method
      await adminAuth.verifyToken();
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication check failed:', error);
      // On error, remove token and redirect to login
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

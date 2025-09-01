import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

const AdminAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header rightContent={null} />
      
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white border-opacity-20 max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Access</h1>
            <p className="text-gray-300 mb-8">
              Access the administrative panel to manage users, inventory, and system settings.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/admin-login"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Admin Login
              </Link>
              
              <Link
                to="/"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminAccess;

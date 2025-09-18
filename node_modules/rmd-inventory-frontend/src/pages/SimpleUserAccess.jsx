import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../App.css';

const SimpleUserAccess = () => {
  console.log("SimpleUserAccess component rendering");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check if already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem('superAdminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'superadmin' && password === 'password') {
      setIsAuthenticated(true);
      localStorage.setItem('superAdminAuth', 'true');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('superAdminAuth');
    setUsername('');
    setPassword('');
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header title="Super Admin Access" />
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Super Admin Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}
              
              <div className="bg-gray-100 p-3 rounded text-sm">
                <strong>Default Credentials:</strong><br />
                Username: superadmin<br />
                Password: password
              </div>
              
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // Admin Dashboard after login
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="User Management" />
      
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Welcome to User Management</h2>
          <p>This is a simplified version of the user management interface.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SimpleUserAccess;

import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/api';

const SimpleUserManagement = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Super Admin Authentication
  const handleSuperAdminLogin = async (e) => {
    e.preventDefault();
    console.log('🚀 Form submitted - handleSuperAdminLogin called');
    
    setLoginLoading(true);
    setLoginError('');

    try {
      console.log('🔍 LOGIN ATTEMPT:', { 
        username: loginForm.username, 
        password: loginForm.password,
        formData: loginForm 
      });

      if (!loginForm.username || !loginForm.password) {
        throw new Error('Username and password are required');
      }

      console.log('🌐 Making fetch request to:', 'http://localhost:8001/api/admin/login');
      
      // Connect to admin table via Laravel API
      const response = await fetch('http://localhost:8001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })
      });

      console.log('🔍 Fetch completed. Response status:', response.status);
      console.log('🔍 Response headers:', response.headers);
      
      if (!response.ok) {
        // Try to get error details from response
        let errorText = '';
        try {
          const errorData = await response.json();
          console.log('❌ Error response data:', errorData);
          errorText = errorData.message || errorData.errors?.username?.[0] || `HTTP ${response.status} error`;
        } catch (parseError) {
          errorText = `HTTP ${response.status} error`;
        }
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log('🔍 Response data:', data);

      if (data.token && data.admin) {
        console.log('✅ DATABASE AUTH SUCCESS');
        localStorage.setItem('super_admin_access', 'true');
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_info', JSON.stringify(data.admin));
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        console.log('❌ DATABASE AUTH FAILED - Invalid response structure:', data);
        setLoginError(data.message || 'Invalid admin credentials. Please check your username and password.');
      }
    } catch (error) {
      console.error('🚨 CRITICAL ERROR in handleSuperAdminLogin:', error);
      console.error('🔍 Error type:', error.constructor.name);
      console.error('🔍 Error message:', error.message);
      console.error('🔍 Error stack:', error.stack);
      
      // Try alternative endpoint
      try {
        console.log('🔍 TRYING ALTERNATIVE ENDPOINT...');
        const altResponse = await fetch('http://localhost:8001/api/auth/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username: loginForm.username,
            email: loginForm.username,
            password: loginForm.password
          })
        });

        if (altResponse.ok) {
          const altData = await altResponse.json();
          console.log('✅ ALTERNATIVE ENDPOINT SUCCESS:', altData);
          
          localStorage.setItem('super_admin_access', 'true');
          localStorage.setItem('admin_token', altData.token || 'authenticated');
          localStorage.setItem('admin_info', JSON.stringify(altData.admin || altData.user));
          setIsAuthenticated(true);
          setLoginError('');
          return;
        }
      } catch (altError) {
        console.log('❌ Alternative endpoint also failed');
      }

      // DUMMY LOGIN FALLBACK - Only if database fails
      if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
        console.log('✅ FALLBACK TO DUMMY LOGIN SUCCESS');
        localStorage.setItem('super_admin_access', 'true');
        localStorage.setItem('admin_token', 'dummy_token');
        localStorage.setItem('admin_info', JSON.stringify({ 
          id: 999,
          name: 'Test Admin (Dummy)',
          username: 'admin',
          email: 'admin@test.com'
        }));
        setIsAuthenticated(true);
        setLoginError('');
        return;
      }

      // Final fallback - check if it's a network error or server issue
      if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
        setLoginError('Cannot connect to server. Please check if the Laravel backend is running on port 8001.');
      } else {
        setLoginError('Login failed. Please check your credentials or contact administrator.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleSuperAdminLogout = async () => {
    try {
      // Try to logout from server
      const token = localStorage.getItem('admin_token');
      if (token && token !== 'authenticated') {
        await fetch('http://localhost:8001/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          credentials: 'include'
        });
      }
    } catch (error) {
      console.log('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless
      localStorage.removeItem('super_admin_access');
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_info');
      setIsAuthenticated(false);
      setLoginForm({ username: '', password: '' });
      setLoginError('');
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('super_admin_access');
    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // MODERN LOGIN UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          {/* Login Card */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:rotate-6">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Super Admin Access
              </h2>
              <p className="text-gray-600 font-medium">
                Secure authentication required
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mt-4"></div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSuperAdminLogin}>
              <div className="space-y-5">
                {/* Email/Username Field */}
                <div className="floating-label-input group">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="peer w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300 ease-in-out transform hover:border-gray-300"
                    placeholder="Email or Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  />
                  <label 
                    htmlFor="username" 
                    className="floating-label peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-red-600 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-2 peer-focus:mx-2 text-sm -top-2.5 bg-white px-2 mx-2 text-red-600 absolute left-2 transition-all duration-200 ease-in-out transform origin-left pointer-events-none"
                  >
                    Email or Username
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Password Field */}
                <div className="floating-label-input group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="peer w-full px-4 py-3.5 pr-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300 ease-in-out transform hover:border-gray-300"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                  <label 
                    htmlFor="password" 
                    className="floating-label peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-red-600 peer-focus:text-sm peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-2 peer-focus:mx-2 text-sm -top-2.5 bg-white px-2 mx-2 text-red-600 absolute left-2 transition-all duration-200 ease-in-out transform origin-left pointer-events-none"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <div className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Error Message */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 animate-shake">
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:hover:scale-100"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    {loginLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <svg className="h-5 w-5 text-red-300 group-hover:text-red-200 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </span>
                  {loginLoading ? (
                    <span className="flex items-center space-x-2">
                      <span>Authenticating</span>
                      <span className="flex space-x-1">
                        <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="h-1 w-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </span>
                    </span>
                  ) : (
                    'Access Super Admin Panel'
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                Secure access to administrative functions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD - SIMPLE VERSION
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the administrative panel</p>
          </div>
          <button
            onClick={handleSuperAdminLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Successfully authenticated as Super Admin!</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Users</h3>
            <p className="text-gray-600">Manage system users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory</h3>
            <p className="text-gray-600">Track equipment and resources</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-gray-600">Generate system reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleUserManagement;

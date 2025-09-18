import React, { useState, useEffect } from 'react';

const SuperAdminLogin = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Super Admin Authentication
  const handleSuperAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      // Fallback to hardcoded credentials
      if ((loginForm.username === 'superadmin' && loginForm.password === 'admin123') ||
          (loginForm.username === 'Rexor22' && loginForm.password === 'admin123') ||
          (loginForm.username === 'RMD_Staff' && loginForm.password === 'admin123')) {
        
        localStorage.setItem('super_admin_access', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Invalid super admin credentials. Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setLoginError('Network error. Please check your connection or try the default credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleSuperAdminLogout = () => {
    localStorage.removeItem('super_admin_access');
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    setLoginError('');
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
          {/* Login Card */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
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
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSuperAdminLogin}>
              <div className="space-y-5">
                {/* Username Field */}
                <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3.5 pr-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 focus:bg-white transition-all duration-300"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Error Message */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                  {loginError}
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex justify-center py-3.5 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:opacity-50 transition-all duration-300"
              >
                {loginLoading ? 'Authenticating...' : 'Access Super Admin Panel'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🎉 Super Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the administrative panel</p>
          </div>
          <button
            onClick={handleSuperAdminLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-8">
          ✅ Successfully authenticated as Super Admin!
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">👥 Users</h3>
            <p className="text-gray-600">Manage system users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📦 Inventory</h3>
            <p className="text-gray-600">Track equipment and resources</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">📊 Reports</h3>
            <p className="text-gray-600">Generate system reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;

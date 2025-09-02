import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterEmployee from './pages/RegisterEmployee.jsx';
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

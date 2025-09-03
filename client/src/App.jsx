import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterEmployee from './pages/RegisterEmployee.jsx';
<<<<<<< HEAD
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
=======
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ProtectedRoute from './admin/components/ProtectedRoute.jsx';
>>>>>>> 48275face3fabc943866499a45a7293cef2ac622

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/admin" element={<AdminLogin />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={<AdminDashboard />} />
=======
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
>>>>>>> 48275face3fabc943866499a45a7293cef2ac622
      </Routes>
    </Router>
  );
}

export default App;

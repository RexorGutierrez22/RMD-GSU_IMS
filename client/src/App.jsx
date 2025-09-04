import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterStudent from './pages/RegisterStudent.jsx';
import RegisterEmployee from './pages/RegisterEmployee.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
<<<<<<< HEAD
import AdminDashboard from './pages/AdminDashboard-Clean.jsx';
=======
import AdminDashboard from './pages/AdminDashboard.jsx';
>>>>>>> 3cd2cb345e882a5f66dbbc779dd1ea9e0fbb0243

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

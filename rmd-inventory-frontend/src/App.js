import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import RegisterStudent from './pages/RegisterStudent';
import RegisterEmployee from './pages/RegisterEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;

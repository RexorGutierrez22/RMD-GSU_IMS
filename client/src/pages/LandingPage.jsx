import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Background image full-screen */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/eagle.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white opacity-30 z-0"></div>

      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-8" style={{ marginTop: '-130px' }}>
          Good Day! How may I assist you?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="main-btn">Borrow/Request</button>
          <button className="main-btn">Return an Item</button>
          <button className="main-btn" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

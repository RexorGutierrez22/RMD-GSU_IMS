import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray- relative overflow-hidden">
      {/* Background image full-screen */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/dashboard.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white opacity-60 z-0"></div>

      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        <h2 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 px-4">
          Good Day! How may I assist you?
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
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

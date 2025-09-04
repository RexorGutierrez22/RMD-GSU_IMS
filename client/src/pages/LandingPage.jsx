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
      <Header onTitleClick={() => navigate('/admin')} />

      {/* Main Content */}
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="mb-8 -mt-[130px]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent animate-pulse">
            Good Day!
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 shadow-lg relative">
            <span className="relative z-10 px-4 py-2 rounded-lg text-shadow-lg">
              How may I assist you?
            </span>
            {/* Decorative elements */}
            <span className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 rounded-full opacity-20 animate-bounce"></span>
            <span className="absolute -bottom-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-30 animate-bounce [animation-delay:0.5s]"></span>
          </p>
        </div>

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

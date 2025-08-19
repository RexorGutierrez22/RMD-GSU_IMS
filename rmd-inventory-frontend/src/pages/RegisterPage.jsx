import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Background image full-screen via img ensures loading */}
      <img
        src={`${process.env.PUBLIC_URL}/Registration.png`}
        alt="Registration background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-white/20 z-10"></div>

      {/* Global Header with custom title and Back button on the right */}
      <div className="relative z-20">
        <Header
          title="Registration"
          rightContent={
            <button
              className="back-btn"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          }
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-20 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 md:py-16 lg:py-24">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-6 sm:mb-8 px-4">
          Are you a Student or Employee?
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4">
          <button className="main-btn" onClick={() => navigate('/register/student')}>Student</button>
          <button className="main-btn" onClick={() => navigate('/register/employee')}>Employee</button>
        </div>
      </main>

      {/* Global Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterPage;

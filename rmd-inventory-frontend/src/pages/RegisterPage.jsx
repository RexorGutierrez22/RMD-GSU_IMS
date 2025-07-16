import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Background image full-screen */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Registration.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-white opacity-70 z-0"></div>

      {/* Global Header with custom title */}
      <div className="relative z-20">
        <Header title="Registration" />
      </div>

      {/* Main Content */}
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        {/* Optional image removed: background already set */}
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4">
          Are you a Student or Employee?
        </h1>

        {/* Subtitle */}
        <p className="text-md sm:text-lg text-black mb-6">
          
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="main-btn">Student</button>
          <button className="main-btn">Employee</button>
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

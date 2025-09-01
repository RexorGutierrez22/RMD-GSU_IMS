import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/Header.jsx';
import Footer from '../../shared/components/Footer.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray- relative overflow-hidden">
      {/* Background image full-screen via img ensures loading */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/Dashboard.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-white opacity-60 z-0"></div>

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
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 mt-[-130px]">
        Are you a Student or Employee?
        </h2>
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

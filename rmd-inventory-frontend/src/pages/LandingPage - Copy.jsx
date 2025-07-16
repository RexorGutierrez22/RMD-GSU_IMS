import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background image full-screen */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/dashboard1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Optional overlay to darken image for contrast */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Red Header Bar - always on top */}
      <header className="relative z-20 bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
      </header>

      {/* Centered Content */}
      <main className="flex-1 z-10 flex flex-col items-center justify-center text-center px-4 py-32">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">
          Good Day! How may I assist you?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="main-btn">Borrow/Request</button>
          <button className="main-btn">Return an Item</button>
          <button className="main-btn">Register</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-600 text-white p-4 text-center z-10">
        © 2025 CIC INTERNS
      </footer>
    </div>
  );
};

export default LandingPage;

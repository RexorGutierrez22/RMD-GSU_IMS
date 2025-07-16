import React from 'react';

const Header = ({ title = 'Dashboard' }) => {
  return (
    <header className="relative z-20 bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;

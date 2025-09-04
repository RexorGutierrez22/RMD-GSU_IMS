import React from 'react';

const Header = ({ title = 'Resource Management Division', rightContent = null, onTitleClick = null }) => {
  return (
    <header className="relative z-20 shadow-md bg-[#BA2C2C]">
      <div className="mx-auto w-full max-w-7xl h-7 px-2 sm:px-4 flex flex-wrap items-center justify-between gap-2">
        <h1 
          className={`text-lg sm:text-xl md:text-2xl font-bold text-white break-words ${
            onTitleClick ? 'cursor-pointer hover:text-gray-200 transition-colors' : ''
          }`}
          onClick={onTitleClick}
        >
          {title}
        </h1>
        <div className="flex items-center flex-shrink-0">
          {rightContent}
        </div>
      </div>
    </header>
  );
};

export default Header;

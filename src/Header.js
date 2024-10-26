import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow-lg z-40 flex justify-between items-center px-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">JS Task Manager</h1>
      <button onClick={toggleTheme} className="focus:outline-none">
        {darkMode ? <FiSun className="h-6 w-6 text-yellow-500" /> : <FiMoon className="h-6 w-6 text-gray-800 dark:text-gray-100" />}
      </button>
    </header>
  );
};

export default Header;

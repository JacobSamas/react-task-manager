import React from "react";
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Header = ({ darkMode, toggleTheme, isCollapsed }) => {
  return (
    <header
      className={`fixed top-0 right-0 h-auto bg-gray-100 dark:bg-gray-900 shadow-lg z-30 flex flex-col md:flex-row justify-between items-center transition-all duration-300 px-4 md:px-6 py-3`}
      style={{ width: `calc(100% - ${isCollapsed ? "4rem" : "16rem"})` }}
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
          JS Task Manager
        </h1>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="focus:outline-none flex items-center justify-center rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <FiSun className="h-5 w-5 text-yellow-500" />
            ) : (
              <FiMoon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
            )}
          </button>

          <FaUser className="h-5 w-5 text-gray-800 dark:text-gray-100" />
        </div>
      </div>

      <div className="w-full mt-3 md:mt-0 md:w-auto md:flex-grow flex justify-center md:justify-end">
        <div className="relative w-full md:w-auto max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-500 dark:text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="focus:outline-none flex items-center justify-center rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? (
            <FiSun className="h-6 w-6 text-yellow-500" />
          ) : (
            <FiMoon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          )}
        </button>

        <FaUser className="h-6 w-6 text-gray-800 dark:text-gray-100" />
      </div>
    </header>
  );
};

export default Header;

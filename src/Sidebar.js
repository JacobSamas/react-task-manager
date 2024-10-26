import React, { useState } from 'react';
import { FaHome, FaTasks, FaSignInAlt, FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className={`bg-gray-800 text-gray-300 transition-all ease-in-out duration-500 h-screen ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col relative`}>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="text-white p-2 absolute -right-4 top-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none"
      >
        {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
      </button>

      {/* Logo Section */}
      <div className="flex items-center p-4 mt-6">
        <div className="bg-white text-black text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
          JS
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-xl font-bold transition-opacity duration-300">
            Task Manager
          </span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-4" />

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 mt-6">
        <NavItem isCollapsed={isCollapsed} icon={<FaHome />} label="Home" />
        <NavItem isCollapsed={isCollapsed} icon={<FaTasks />} label="My Tasks" />

        <hr className="border-gray-600 my-8" />

        <NavItem
          isCollapsed={isCollapsed}
          icon={isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />}
          label={isLoggedIn ? 'Logout' : 'Login'}
          onClick={handleAuthClick}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, isCollapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center p-3 text-left w-full transition-colors duration-300 focus:outline-none hover:bg-gray-700"
      aria-label={label}
      tabIndex={0}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && (
        <span className="ml-4">{label}</span>
      )}
      {isCollapsed && (
        <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-700 text-white text-xs p-1 rounded-md">
          {label}
        </span>
      )}
    </button>
  );
};

export default Sidebar;

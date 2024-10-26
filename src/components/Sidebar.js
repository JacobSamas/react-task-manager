import React, { useState } from "react";
import {
  FaHome,
  FaTasks,
  FaSignInAlt,
  FaSignOutAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed, setIsCollapsed, darkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-900"
      } transition-all ease-in-out duration-500 h-screen fixed top-0 left-0 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
      style={{ zIndex: 50 }}
    >
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className={`p-1 absolute -right-4 top-4 ${
          darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"
        } rounded-full transition-colors duration-300 focus:outline-none h-8 w-8 flex items-center justify-center z-[100]`}
        style={{ zIndex: 100 }}
      >
        {isCollapsed ? (
          <FaArrowRight className="h-4 w-4" />
        ) : (
          <FaArrowLeft className="h-4 w-4" />
        )}
      </button>

      <div className="flex items-center p-4 mt-6">
        <div
          className={`${
            darkMode ? "bg-white text-black" : "bg-black text-white"
          } text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full`}
        >
          JS
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-xl font-bold transition-opacity duration-300">
            Task Manager
          </span>
        )}
      </div>

      <hr className={`${darkMode ? "border-gray-600" : "border-gray-300"} my-4`} />

      <nav className="flex flex-col space-y-2">
        <NavItem isCollapsed={isCollapsed} icon={<FaHome />} label="Home" darkMode={darkMode} />
        <NavItem
          isCollapsed={isCollapsed}
          icon={<FaTasks />}
          label="My Tasks"
          darkMode={darkMode}
        />

        <hr className={`${darkMode ? "border-gray-600" : "border-gray-300"} my-8`} />

        <NavItem
          isCollapsed={isCollapsed}
          icon={isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />}
          label={isLoggedIn ? "Logout" : "Login"}
          onClick={handleAuthClick}
          darkMode={darkMode}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, isCollapsed, onClick, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center p-3 text-left w-full transition-colors duration-300 focus:outline-none ${
        darkMode
          ? "hover:bg-gray-700 text-gray-300"
          : "hover:bg-gray-200 text-gray-900"
      }`}
      aria-label={label}
      tabIndex={0}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && <span className="ml-4">{label}</span>}
      {isCollapsed && (
        <span
          className={`absolute left-full ml-2 hidden group-hover:block ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          } text-xs p-1 rounded-md text-gray-100`}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default Sidebar;

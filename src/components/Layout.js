import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        darkMode={darkMode}  
      />

      <div
        className={`flex-grow transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          isCollapsed={isCollapsed}
        />

        <main className="pt-20 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
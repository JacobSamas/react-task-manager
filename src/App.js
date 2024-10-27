import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="*" element={<h2>404 - Page Not Found</h2>} /> 
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

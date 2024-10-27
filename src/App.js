import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <Router>
      <ToastContainer 
        position="top-center"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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

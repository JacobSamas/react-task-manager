import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes></Routes>
      </Layout>
    </Router>
  );
};

export default App;

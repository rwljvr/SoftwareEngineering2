import React from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import OriginsPage from "./components/OriginsPage";   // ✅ new
import MerchPage from "./components/MerchPage";       // ✅ new
import "./App.css";
function App() {
  return (
    <div className="app">
  <Sidebar />
  <div className="main-content">
    <HomePage />
    <AboutPage />
    <OriginsPage />
    <MerchPage />
  </div>
</div>

  );
}

export default App;

import React from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import OriginsPage from "./components/OriginsPage";   // ✅ new
import MerchPage from "./components/MerchPage";       // ✅ new

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <HomePage />
        <AboutPage />
        <OriginsPage />   {/* ✅ linked to "origins" */}
        <MerchPage />     {/* ✅ linked to "merch" */}
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import OriginsPage from "./components/OriginsPage";   // ✅ new
import MerchPage from "./components/MerchPage";       // ✅ new
<<<<<<< HEAD
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

=======

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
>>>>>>> 048ac60c2b2aa8e1ee017b02d0dd21445901065f
  );
}

export default App;

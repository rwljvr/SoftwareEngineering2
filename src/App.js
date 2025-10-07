import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import OriginsPage from "./components/OriginsPage";
import MerchPage from "./components/MerchPage";
import "./App.css";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sidebar width values
  const expandedWidth = 220;
  const collapsedWidth = 70;

  const currentSidebarWidth = sidebarCollapsed ? collapsedWidth : expandedWidth;

  return (
    <div className="app" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar onToggle={(collapsed) => setSidebarCollapsed(collapsed)} />

      {/* Main content area */}
      <div
        className="main-content"
        style={{
          marginLeft: `${currentSidebarWidth}px`,
          width: `calc(100% - ${currentSidebarWidth}px)`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
          overflowX: "hidden", // prevent horizontal scroll
        }}
      >
        {/* Pages */}
        <HomePage sidebarCollapsed={sidebarCollapsed} />
        <AboutPage sidebarCollapsed={sidebarCollapsed} />
        <OriginsPage sidebarCollapsed={sidebarCollapsed} />
        <MerchPage sidebarCollapsed={sidebarCollapsed} />
      </div>
    </div>
  );
}

export default App;

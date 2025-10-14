// File: src/components/NameEntryModal.js
import React, { useState } from "react";

const NameEntryModal = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e1e1e, #2b2b2b)",
          border: "2px solid rgba(219,192,132,0.5)",
          borderRadius: "20px",
          padding: "40px 50px",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(219,192,132,0.3)",
          width: "350px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: "#dbc084",
            marginBottom: "10px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Enter Your Name
        </h2>
        <p
          style={{
            color: "#f2e9ce",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          We'll use this for the leaderboard.
        </p>

        <input
          type="text"
          placeholder="Type your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && name.trim()) {
              onSubmit(name);
            }
          }}
          style={{
            width: "100%",
            padding: "12px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(219,192,132,0.5)",
            outline: "none",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "25px",
            background: "#1a1a1a",
            color: "#f2e9ce",
            fontSize: "15px",
          }}
          autoFocus
        />

        <button
          onClick={() => {
            if (name.trim()) onSubmit(name);
          }}
          disabled={!name.trim()}
          style={{
            background: name.trim() 
              ? "linear-gradient(135deg, #dbc084, #f4d799)" 
              : "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50px",
            padding: "12px 30px",
            fontWeight: "600",
            cursor: name.trim() ? "pointer" : "not-allowed",
            fontFamily: "Poppins, sans-serif",
            color: name.trim() ? "#2c2c2c" : "#888",
            fontSize: "15px",
            transition: "all 0.3s ease",
            boxShadow: name.trim() 
              ? "0 6px 20px rgba(219,192,132,0.5)" 
              : "none",
          }}
          onMouseEnter={(e) => {
            if (name.trim()) {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(219,192,132,0.8)";
            }
          }}
          onMouseLeave={(e) => {
            if (name.trim()) {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(219,192,132,0.5)";
            }
          }}
        >
          Begin Test →
        </button>
      </div>
    </div>
  );
};

export default NameEntryModal;
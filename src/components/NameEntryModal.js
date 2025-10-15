// File: src/components/NameEntryModal.js
import React, { useState } from "react";
import "./NameEntryModal.css";

export default function NameEntryModal({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateName = (input) => {
    // Only allow letters (including accented characters) and spaces
    const validNameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return validNameRegex.test(input);
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    
    // Allow empty input for deletion
    if (input === "") {
      setName("");
      setError("");
      return;
    }

    // Check if input contains only valid characters
    if (validateName(input)) {
      // Limit to 20 characters
      if (input.length <= 20) {
        setName(input);
        setError("");
      } else {
        setError("Name must not exceed 20 characters");
      }
    } else {
      setError("Name can only contain letters and spaces");
    }
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      setError("Please enter your name");
      return;
    }

    if (trimmedName.length < 1) {
      setError("Name must be at least 1 character");
      return;
    }

    if (!validateName(trimmedName)) {
      setError("Name can only contain letters and spaces");
      return;
    }

    onSubmit(trimmedName);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1001,
        backdropFilter: "blur(5px)"
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(20, 20, 20, 0.95)",
          border: "2px solid rgba(219, 192, 132, 0.4)",
          borderRadius: "16px",
          padding: "40px 30px",
          width: "90%",
          maxWidth: "450px",
          boxShadow: "0 10px 30px rgba(219, 192, 132, 0.4)",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #dbc084, #f4d799)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            margin: "0 auto 20px",
            boxShadow: "0 6px 20px rgba(219, 192, 132, 0.4)"
          }}
        >
          👤
        </div>

        <h2
          style={{
            color: "#dbc084",
            fontSize: "24px",
            marginBottom: "10px",
            fontWeight: "700"
          }}
        >
          Welcome to Baybayin Test
        </h2>

        <p
          style={{
            fontSize: "14px",
            marginBottom: "25px",
            opacity: 0.9,
            color: "#f2e9ce"
          }}
        >
          Enter your name to begin the practice test
        </p>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your name"
            maxLength={20}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "10px",
              border: error
                ? "2px solid rgba(220, 53, 69, 0.6)"
                : "2px solid rgba(219, 192, 132, 0.3)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "white",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              if (!error) {
                e.target.style.borderColor = "rgba(219, 192, 132, 0.6)";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }
            }}
            onBlur={(e) => {
              if (!error) {
                e.target.style.borderColor = "rgba(219, 192, 132, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }
            }}
          />
          
          {error && (
            <p
              style={{
                color: "#ff6b6b",
                fontSize: "13px",
                marginTop: "8px",
                textAlign: "left",
                paddingLeft: "5px"
              }}
            >
              ⚠️ {error}
            </p>
          )}

          <p
            style={{
              fontSize: "12px",
              color: "rgba(242, 233, 206, 0.6)",
              marginTop: "8px",
              textAlign: "right"
            }}
          >
            {name.length}/20 characters
          </p>
        </div>

        <div
          style={{
            background: "rgba(219, 192, 132, 0.1)",
            border: "1px solid rgba(219, 192, 132, 0.3)",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "25px",
            fontSize: "13px",
            color: "rgba(242, 233, 206, 0.8)",
            textAlign: "left"
          }}
        >
          <strong style={{ color: "#dbc084" }}>📋 Name Requirements:</strong>
          <ul style={{ margin: "8px 0 0 20px", lineHeight: "1.6" }}>
            <li>Letters only (A-Z, a-z)</li>
            <li>Spaces allowed</li>
            <li>No numbers or special characters</li>
            <li>Maximum 20 characters</li>
          </ul>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px"
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || error}
            style={{
              background:
                name.trim() && !error
                  ? "linear-gradient(135deg, #dbc084, #f4d799)"
                  : "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: name.trim() && !error ? "#2c2c2c" : "#888",
              padding: "12px 30px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: name.trim() && !error ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow:
                name.trim() && !error
                  ? "0 6px 20px rgba(219, 192, 132, 0.5)"
                  : "none",
              fontSize: "15px"
            }}
          >
            Begin Test →
          </button>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(219, 192, 132, 0.5)",
              color: "#dbc084",
              padding: "12px 30px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "all 0.3s ease",
              fontSize: "15px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(219, 192, 132, 0.2)";
              e.currentTarget.style.borderColor = "#dbc084";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(219, 192, 132, 0.5)";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
// File: src/components/PracticeTestModal.js
import React from "react";
import "./PracticeTestModal.css";

export default function PracticeTestModal({
  quizSet,
  currentQuestion,
  selectedAnswer,
  userAnswers,
  showResults,
  score,
  onSelectAnswer,
  onNextQuestion,
  onRestartTest,
  onClose,
  playerName
}) {
  if (!quizSet || quizSet.length === 0) return null;

  const question = quizSet[currentQuestion];
  const totalQuestions = quizSet.length;

  // Get leaderboard from localStorage
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  return (
    <div
      className="test-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)"
      }}
      onClick={onClose}
    >
      <div
        className="test-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(20, 20, 20, 0.95)",
          border: "2px solid rgba(219, 192, 132, 0.4)",
          borderRadius: "16px",
          padding: "40px 30px",
          width: "90%",
          maxWidth: showResults ? "700px" : "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(219, 192, 132, 0.4)",
          color: "white",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center"
        }}
      >
        {!showResults ? (
          <>
            <h2
              style={{
                color: "#dbc084",
                fontSize: "22px",
                marginBottom: "15px"
              }}
            >
              Question {currentQuestion + 1} of {totalQuestions}
            </h2>

            <p style={{ marginBottom: "20px", fontSize: "17px" }}>
              {question.question}
            </p>

            {question.type === "character" && question.image && (
              <img
                src={question.image}
                alt="Question character"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "contain",
                  marginBottom: "15px"
                }}
              />
            )}

            <div
              className="options-container"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "25px"
              }}
            >
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectAnswer(index)}
                  style={{
                    background:
                      selectedAnswer === index
                        ? "linear-gradient(135deg, #dbc084, #f4d799)"
                        : "rgba(255, 255, 255, 0.1)",
                    border:
                      selectedAnswer === index
                        ? "2px solid #dbc084"
                        : "2px solid rgba(219,192,132,0.3)",
                    color: selectedAnswer === index ? "#2c2c2c" : "#dbc084",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={onNextQuestion}
              disabled={selectedAnswer === null}
              style={{
                background:
                  selectedAnswer !== null
                    ? "linear-gradient(135deg, #dbc084, #f4d799)"
                    : "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: selectedAnswer !== null ? "#2c2c2c" : "#888",
                padding: "12px 30px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: selectedAnswer !== null ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                boxShadow:
                  selectedAnswer !== null
                    ? "0 6px 20px rgba(219, 192, 132, 0.5)"
                    : "none"
              }}
            >
              {currentQuestion === totalQuestions - 1
                ? "Show Results"
                : "Next"}
            </button>
          </>
        ) : (
          <>
            <h2 style={{ color: "#dbc084", marginBottom: "15px" }}>
              Your Results
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              You scored <strong>{score}</strong> out of{" "}
              <strong>{totalQuestions}</strong>
            </p>
            <p
              style={{
                fontSize: "16px",
                opacity: 0.9,
                marginBottom: "30px"
              }}
            >
              {score >= totalQuestions * 0.7
                ? "Excellent! You really know your Baybayin!"
                : "Keep practicing! You're doing great learning Baybayin."}
            </p>

            {leaderboard.length > 0 && (
              <div
                style={{
                  background: "rgba(219, 192, 132, 0.1)",
                  border: "1px solid rgba(219, 192, 132, 0.3)",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "25px"
                }}
              >
                <h3
                  style={{
                    color: "#dbc084",
                    fontSize: "20px",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  🏆 Top 5 Leaderboard
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {leaderboard.map((entry, index) => {
                    const isCurrentPlayer = entry.name === playerName && entry.score === score;
                    return (
                      <div
                        key={index}
                        style={{
                          background: isCurrentPlayer
                            ? "linear-gradient(135deg, rgba(219, 192, 132, 0.3), rgba(244, 215, 153, 0.2))"
                            : "rgba(255, 255, 255, 0.05)",
                          border: isCurrentPlayer
                            ? "2px solid rgba(219, 192, 132, 0.6)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                          padding: "12px 15px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "#dbc084",
                              minWidth: "25px"
                            }}
                          >
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                          </span>
                          <span
                            style={{
                              color: isCurrentPlayer ? "#dbc084" : "#f2e9ce",
                              fontWeight: isCurrentPlayer ? "700" : "500",
                              fontSize: "15px"
                            }}
                          >
                            {entry.name}
                            {isCurrentPlayer && (
                              <span style={{ marginLeft: "8px", fontSize: "12px", opacity: 0.8 }}>
                                (You!)
                              </span>
                            )}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                          <span
                            style={{
                              color: "#dbc084",
                              fontWeight: "700",
                              fontSize: "16px"
                            }}
                          >
                            {entry.score}/{totalQuestions}
                          </span>
                          <span
                            style={{
                              color: "rgba(242, 233, 206, 0.6)",
                              fontSize: "12px",
                              minWidth: "80px",
                              textAlign: "right"
                            }}
                          >
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px"
              }}
            >
              <button
                onClick={onRestartTest}
                style={{
                  background: "linear-gradient(135deg, #dbc084, #f4d799)",
                  border: "none",
                  color: "#2c2c2c",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s ease"
                }}
              >
                Retake Test
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(219,192,132,0.5)",
                  color: "#dbc084",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(219,192,132,0.2)";
                  e.currentTarget.style.borderColor = "#dbc084";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(219,192,132,0.5)";
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
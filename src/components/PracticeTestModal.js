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
  // Get leaderboard from memory (not localStorage)
  const [leaderboard] = React.useState([]);

  if (!quizSet || quizSet.length === 0) return null;

  const question = quizSet[currentQuestion];
  const totalQuestions = quizSet.length;

  // Calculate performance metrics
  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  const correctAnswers = score;
  const incorrectAnswers = totalQuestions - score;

  // Determine performance level and message
  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        level: "Outstanding!",
        message: "You're a Baybayin Master! Exceptional knowledge of the script and culture.",
        emoji: "🏆",
        color: "#FFD700"
      };
    } else if (percentage >= 80) {
      return {
        level: "Excellent!",
        message: "Great job! You have a strong understanding of Baybayin.",
        emoji: "⭐",
        color: "#dbc084"
      };
    } else if (percentage >= 70) {
      return {
        level: "Good Work!",
        message: "You're doing well! Keep practicing to master more characters.",
        emoji: "👏",
        color: "#90EE90"
      };
    } else if (percentage >= 60) {
      return {
        level: "Nice Try!",
        message: "You're making progress! Review the materials and try again.",
        emoji: "📚",
        color: "#87CEEB"
      };
    } else {
      return {
        level: "Keep Learning!",
        message: "Don't give up! Practice makes perfect in learning Baybayin.",
        emoji: "💪",
        color: "#FFA07A"
      };
    }
  };

  const performanceData = getPerformanceData();

  // Count question types answered correctly
  const characterCorrect = userAnswers.filter((answer, idx) => 
    answer === quizSet[idx].correct && quizSet[idx].type === 'character'
  ).length;
  
  const triviaCorrect = userAnswers.filter((answer, idx) => 
    answer === quizSet[idx].correct && quizSet[idx].type === 'trivia'
  ).length;

  const characterTotal = quizSet.filter(q => q.type === 'character').length;
  const triviaTotal = quizSet.filter(q => q.type === 'trivia').length;

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
          maxWidth: showResults ? "900px" : "600px",
          maxHeight: "95vh",
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
            {/* Performance Badge */}
            <div
              style={{
                fontSize: "60px",
                marginBottom: "10px",
                animation: "bounce 0.6s ease"
              }}
            >
              {performanceData.emoji}
            </div>

            <h2 
              style={{ 
                color: performanceData.color, 
                marginBottom: "10px",
                fontSize: "28px",
                fontWeight: "700"
              }}
            >
              {performanceData.level}
            </h2>

            <p
              style={{
                fontSize: "16px",
                opacity: 0.9,
                marginBottom: "25px",
                color: "#f2e9ce"
              }}
            >
              {performanceData.message}
            </p>

            {/* Score Summary Card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(219, 192, 132, 0.2), rgba(244, 215, 153, 0.1))",
                border: "2px solid rgba(219, 192, 132, 0.4)",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "25px"
              }}
            >
              <div style={{ fontSize: "48px", fontWeight: "700", color: "#dbc084", marginBottom: "10px" }}>
                {score}/{totalQuestions}
              </div>
              <div style={{ fontSize: "32px", fontWeight: "600", color: "#f4d799", marginBottom: "5px" }}>
                {percentage}%
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8, color: "#f2e9ce" }}>
                Overall Score
              </div>
            </div>

            {/* Summary Stats */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(219, 192, 132, 0.3)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px"
              }}
            >
              <h3
                style={{
                  color: "#dbc084",
                  fontSize: "18px",
                  marginBottom: "15px",
                  textAlign: "center"
                }}
              >
                📊 Summary
              </h3>

              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#90EE90" }}>
                    {correctAnswers}
                  </div>
                  <div style={{ fontSize: "14px", color: "#f2e9ce", opacity: 0.8 }}>
                    ✅ Correct
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: "#FFA07A" }}>
                    {incorrectAnswers}
                  </div>
                  <div style={{ fontSize: "14px", color: "#f2e9ce", opacity: 0.8 }}>
                    ❌ Incorrect
                  </div>
                </div>
              </div>

              {(characterTotal > 0 || triviaTotal > 0) && (
                <>
                  <div style={{ height: "1px", background: "rgba(219, 192, 132, 0.3)", margin: "15px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-around", fontSize: "14px" }}>
                    {characterTotal > 0 && (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#dbc084", fontWeight: "600", marginBottom: "5px" }}>
                          🔤 Characters
                        </div>
                        <div style={{ color: "#f2e9ce" }}>
                          {characterCorrect}/{characterTotal}
                        </div>
                      </div>
                    )}
                    {triviaTotal > 0 && (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#dbc084", fontWeight: "600", marginBottom: "5px" }}>
                          📖 Trivia
                        </div>
                        <div style={{ color: "#f2e9ce" }}>
                          {triviaCorrect}/{triviaTotal}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Detailed Answer Review */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(219, 192, 132, 0.3)",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "25px",
                textAlign: "left"
              }}
            >
              <h3
                style={{
                  color: "#dbc084",
                  fontSize: "18px",
                  marginBottom: "15px",
                  textAlign: "center"
                }}
              >
                📝 Answer Review
              </h3>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px" 
              }}>
                {quizSet.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const isCorrect = userAnswer === q.correct;
                  
                  return (
                    <div
                      key={idx}
                      style={{
                        background: isCorrect 
                          ? "rgba(144, 238, 144, 0.1)" 
                          : "rgba(255, 160, 122, 0.1)",
                        border: `1px solid ${isCorrect ? "rgba(144, 238, 144, 0.3)" : "rgba(255, 160, 122, 0.3)"}`,
                        borderRadius: "8px",
                        padding: "10px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ 
                          fontSize: "16px", 
                          minWidth: "20px"
                        }}>
                          {isCorrect ? "✅" : "❌"}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            color: "#dbc084", 
                            fontWeight: "600", 
                            fontSize: "11px",
                            marginBottom: "4px"
                          }}>
                            Q{idx + 1}: {q.question.length > 50 ? q.question.substring(0, 50) + '...' : q.question}
                          </div>
                          
                          {q.type === "character" && q.image && (
                            <img
                              src={q.image}
                              alt="Character"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "contain",
                                marginBottom: "4px",
                                background: "rgba(255, 255, 255, 0.9)",
                                borderRadius: "3px",
                                padding: "2px"
                              }}
                            />
                          )}

                          <div style={{ fontSize: "10px", lineHeight: "1.4" }}>
                            <div style={{ 
                              color: isCorrect ? "#90EE90" : "#FFA07A",
                              marginBottom: "2px"
                            }}>
                              <strong>You:</strong> {q.options[userAnswer]}
                            </div>
                            {!isCorrect && (
                              <div style={{ color: "#90EE90" }}>
                                <strong>Correct:</strong> {q.options[q.correct]}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard Section */}
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

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                flexWrap: "wrap"
              }}
            >
              <button
                onClick={onRestartTest}
                style={{
                  background: "linear-gradient(135deg, #dbc084, #f4d799)",
                  border: "none",
                  color: "#2c2c2c",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s ease",
                  fontSize: "15px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(219, 192, 132, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                🔄 Retake Test
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(219,192,132,0.5)",
                  color: "#dbc084",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "all 0.3s ease",
                  fontSize: "15px"
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
                ✖️ Close
              </button>
            </div>

            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
}
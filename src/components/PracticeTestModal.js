import React, { useState } from 'react';

const Leaderboard = ({ leaderboard, currentScore, playerName }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(44, 44, 44, 0.95), rgba(60, 60, 60, 0.95))',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '15px',
      border: '2px solid rgba(219, 192, 132, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '15px',
        borderBottom: '2px solid rgba(219, 192, 132, 0.3)',
        paddingBottom: '12px'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏆</div>
        <h3 style={{
          color: '#dbc084',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '20px',
          fontWeight: '700',
          margin: '0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Leaderboard
        </h3>
        <p style={{
          color: 'rgba(242, 233, 206, 0.7)',
          fontSize: '12px',
          margin: '5px 0 0 0',
          fontStyle: 'italic'
        }}>
          Top 5 Baybayin Masters
        </p>
      </div>

      <div style={{ marginBottom: '12px' }}>
        {leaderboard.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: 'rgba(242, 233, 206, 0.6)',
            fontStyle: 'italic',
            padding: '15px',
            fontSize: '13px'
          }}>
            No scores yet. Be the first to appear on the leaderboard!
          </p>
        ) : (
          leaderboard.map((entry, index) => {
            const isCurrentPlayer = entry.name === playerName && entry.score === currentScore;
            const medals = ['🥇', '🥈', '🥉'];
            
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  marginBottom: '6px',
                  background: isCurrentPlayer 
                    ? 'linear-gradient(90deg, rgba(219, 192, 132, 0.25), rgba(219, 192, 132, 0.15))'
                    : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: isCurrentPlayer 
                    ? '2px solid rgba(219, 192, 132, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  boxShadow: isCurrentPlayer 
                    ? '0 4px 15px rgba(219, 192, 132, 0.3)'
                    : 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1
                }}>
                  <span style={{
                    fontSize: index < 3 ? '20px' : '16px',
                    fontWeight: '700',
                    color: index < 3 ? '#dbc084' : 'rgba(242, 233, 206, 0.6)',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>
                    {index < 3 ? medals[index] : `#${index + 1}`}
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      color: isCurrentPlayer ? '#dbc084' : '#f2e9ce',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: isCurrentPlayer ? '700' : '600',
                      marginBottom: '2px'
                    }}>
                      {entry.name}
                      {isCurrentPlayer && (
                        <span style={{
                          marginLeft: '6px',
                          fontSize: '10px',
                          color: '#dbc084',
                          background: 'rgba(219, 192, 132, 0.2)',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}>
                          YOU
                        </span>
                      )}
                    </div>
                    <div style={{
                      color: 'rgba(242, 233, 206, 0.5)',
                      fontSize: '10px',
                      fontFamily: 'Poppins, sans-serif'
                    }}>
                      {entry.date}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, rgba(219, 192, 132, 0.3), rgba(244, 215, 153, 0.2))',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(219, 192, 132, 0.4)',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#dbc084',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {entry.score}
                  </div>
                  <div style={{
                    color: 'rgba(242, 233, 206, 0.7)',
                    fontSize: '9px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    /10
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {leaderboard.length > 0 && (
        <p style={{
          textAlign: 'center',
          color: 'rgba(242, 233, 206, 0.5)',
          fontSize: '11px',
          margin: '12px 0 0 0',
          fontStyle: 'italic'
        }}>
          Keep practicing to climb the ranks! 🌟
        </p>
      )}
    </div>
  );
};

const PracticeTestModal = ({
  currentQuestion,
  selectedAnswer,
  userAnswers,
  showResults,
  score,
  onSelectAnswer,
  onNextQuestion,
  onRestartTest,
  onClose,
  quizSet,
  playerName,
  leaderboard
}) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (!quizSet || quizSet.length === 0) return null;

  const question = quizSet[currentQuestion];

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
        overflowY: 'auto',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: 'linear-gradient(135deg, rgba(44, 44, 44, 0.98), rgba(60, 60, 60, 0.98))',
          padding: '25px',
          borderRadius: '20px',
          width: '95%',
          maxWidth: '900px',
          textAlign: 'center',
          border: '2px solid rgba(219, 192, 132, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          maxHeight: '95vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {!showResults ? (
          <>
            {/* Question Progress */}
            <div style={{
              marginBottom: '20px',
              padding: '10px',
              background: 'rgba(219, 192, 132, 0.1)',
              borderRadius: '10px',
              border: '1px solid rgba(219, 192, 132, 0.2)'
            }}>
              <p style={{
                color: '#dbc084',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                margin: 0
              }}>
                Question {currentQuestion + 1} of {quizSet.length}
              </p>
              <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                marginTop: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((currentQuestion + 1) / quizSet.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #dbc084, #f4d799)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '25px',
              border: '1px solid rgba(219, 192, 132, 0.2)'
            }}>
              {question.type === 'character' && question.image && (
                <div style={{
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img
                    src={question.image}
                    alt="Baybayin character"
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'contain',
                      background: 'white',
                      padding: '15px',
                      borderRadius: '10px',
                      boxShadow: '0 4px 15px rgba(219, 192, 132, 0.3)'
                    }}
                  />
                </div>
              )}
              
              <h3 style={{
                color: '#f2e9ce',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                fontWeight: '600',
                margin: '0',
                lineHeight: '1.5'
              }}>
                {question.question}
              </h3>
            </div>

            {/* Options */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '25px'
            }}>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectAnswer(index)}
                  style={{
                    padding: '16px 20px',
                    border: selectedAnswer === index 
                      ? '2px solid #dbc084' 
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    background: selectedAnswer === index
                      ? 'linear-gradient(135deg, rgba(219, 192, 132, 0.3), rgba(244, 215, 153, 0.2))'
                      : 'rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '15px',
                    fontWeight: selectedAnswer === index ? '600' : '500',
                    color: selectedAnswer === index ? '#dbc084' : '#f2e9ce',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedAnswer !== index) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(219, 192, 132, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedAnswer !== index) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '20px'
            }}>
              <button
                onClick={onNextQuestion}
                disabled={selectedAnswer === null}
                style={{
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  background: selectedAnswer !== null
                    ? 'linear-gradient(135deg, #dbc084, #f4d799)'
                    : 'rgba(255, 255, 255, 0.2)',
                  color: selectedAnswer !== null ? '#2c2c2c' : 'rgba(242, 233, 206, 0.5)',
                  cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: '600',
                  boxShadow: selectedAnswer !== null 
                    ? '0 4px 15px rgba(219, 192, 132, 0.4)' 
                    : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {currentQuestion < quizSet.length - 1 ? 'Next Question →' : 'Finish Test'}
              </button>

              <button
                onClick={onClose}
                style={{
                  padding: '12px 30px',
                  border: '2px solid rgba(219, 192, 132, 0.5)',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#dbc084',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Exit Test
              </button>
            </div>
          </>
        ) : (
          <>
            {!showLeaderboard ? (
              <>
                {/* Results Screen */}
                <div style={{
                  marginBottom: '15px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(219, 192, 132, 0.2), rgba(244, 215, 153, 0.1))',
                  borderRadius: '12px',
                  border: '2px solid rgba(219, 192, 132, 0.3)'
                }}>
                  <div style={{
                    fontSize: '36px',
                    marginBottom: '10px'
                  }}>
                    {score >= 8 ? '🎉' : score >= 5 ? '👏' : '💪'}
                  </div>
                  
                  <h2 style={{
                    color: '#dbc084',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 8px 0'
                  }}>
                    Test Complete!
                  </h2>
                  
                  <p style={{
                    color: '#f2e9ce',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    margin: '8px 0'
                  }}>
                    Great work, <strong>{playerName}</strong>!
                  </p>

                  <div style={{
                    fontSize: '40px',
                    fontWeight: '700',
                    color: '#dbc084',
                    margin: '15px 0',
                    textShadow: '0 4px 15px rgba(219, 192, 132, 0.5)'
                  }}>
                    {score} / {quizSet.length}
                  </div>

                  <p style={{
                    color: 'rgba(242, 233, 206, 0.8)',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    margin: '8px 0 0 0',
                    fontStyle: 'italic'
                  }}>
                    {score >= 8 && "Excellent! You're a Baybayin master! 🌟"}
                    {score >= 5 && score < 8 && "Good job! Keep practicing! 📚"}
                    {score < 5 && "Keep learning! Practice makes perfect! 💫"}
                  </p>
                </div>

                {/* Answer Summary */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  padding: '15px',
                  marginBottom: '15px',
                  border: '1px solid rgba(219, 192, 132, 0.2)',
                  overflow: 'hidden'
                }}>
                  <h3 style={{
                    color: '#dbc084',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    📋 Your Answers
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '10px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    paddingRight: '5px'
                  }}>
                    {quizSet.map((q, idx) => {
                      const userAnswer = userAnswers[idx];
                      const isCorrect = userAnswer === q.correct;
                      
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: '10px',
                            background: isCorrect 
                              ? 'rgba(76, 175, 80, 0.1)' 
                              : 'rgba(244, 67, 54, 0.1)',
                            borderRadius: '8px',
                            border: `1px solid ${isCorrect ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                            textAlign: 'left',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start'
                          }}
                        >
                          <span style={{
                            fontSize: '16px',
                            minWidth: '20px',
                            marginTop: '2px'
                          }}>
                            {isCorrect ? '✅' : '❌'}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              color: '#f2e9ce',
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '12px',
                              fontWeight: '600',
                              margin: '0 0 6px 0',
                              lineHeight: '1.3'
                            }}>
                              Q{idx + 1}: {q.question}
                            </p>
                            
                            {q.type === 'character' && q.image && (
                              <img
                                src={q.image}
                                alt="Question"
                                style={{
                                  maxWidth: '40px',
                                  maxHeight: '40px',
                                  background: 'white',
                                  padding: '3px',
                                  borderRadius: '4px',
                                  marginBottom: '6px'
                                }}
                              />
                            )}
                            
                            <div style={{
                              fontSize: '11px',
                              fontFamily: 'Poppins, sans-serif'
                            }}>
                              <p style={{
                                margin: '3px 0',
                                color: isCorrect ? '#81c784' : '#e57373',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                <strong>You:</strong> {q.options[userAnswer]}
                              </p>
                              {!isCorrect && (
                                <p style={{
                                  margin: '3px 0',
                                  color: '#81c784',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  <strong>Correct:</strong> {q.options[q.correct]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginTop: '15px'
                }}>
                  <button
                    onClick={() => setShowLeaderboard(true)}
                    style={{
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #dbc084, #f4d799)',
                      color: '#2c2c2c',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(219, 192, 132, 0.4)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    🏆 View Leaderboard
                  </button>

                  <button
                    onClick={onRestartTest}
                    style={{
                      padding: '10px 24px',
                      border: '2px solid rgba(219, 192, 132, 0.5)',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#dbc084',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Try Again
                  </button>

                  <button
                    onClick={onClose}
                    style={{
                      padding: '10px 24px',
                      border: '2px solid rgba(219, 192, 132, 0.5)',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#dbc084',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Leaderboard View */}
                <div style={{
                  marginBottom: '15px'
                }}>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    style={{
                      padding: '6px 14px',
                      border: 'none',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#dbc084',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ← Back to Results
                  </button>
                </div>

                <Leaderboard 
                  leaderboard={leaderboard || []} 
                  currentScore={score}
                  playerName={playerName}
                />

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '15px'
                }}>
                  <button
                    onClick={onRestartTest}
                    style={{
                      padding: '10px 24px',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #dbc084, #f4d799)',
                      color: '#2c2c2c',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(219, 192, 132, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Try Again
                  </button>

                  <button
                    onClick={onClose}
                    style={{
                      padding: '10px 24px',
                      border: '2px solid rgba(219, 192, 132, 0.5)',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#dbc084',
                      cursor: 'pointer',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PracticeTestModal;
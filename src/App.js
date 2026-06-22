import React, { useState, useEffect } from "react";
import "./App.css";

const THEMES = {
  Nature: [
    "🌿",
    "🍄",
    "🍁",
    "🌵",
    "🌻",
    "🌴",
    "🍀",
    "🍎",
    "🍓",
    "🍇",
    "🍉",
    "🌸",
  ],
  Tech: [
    "💻",
    "📱",
    "⌚",
    "🎧",
    "🔋",
    "🖱️",
    "⌨️",
    "🎮",
    "📡",
    "💾",
    "📸",
    "🔌",
  ],
};

function App() {
  const [gameState, setGameState] = useState("SETUP");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  const [theme, setTheme] = useState("Nature");
  const [level, setLevel] = useState(12); // 8 = 4x4 (16 cards), 12 = 4x6 (24 cards)

  const startGame = () => {
    const selectedSymbols = THEMES[theme].slice(0, level);
    const shuffledCards = [...selectedSymbols, ...selectedSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, id) => ({ id, symbol }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameState("PLAYING");
  };

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((m) => m + 1);

      const match = cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol;

      setTimeout(() => {
        if (match) {
          const newSolved = [...solved, ...newFlipped];
          setSolved(newSolved);

          if (newSolved.length === cards.length) {
            setTimeout(() => setGameState("VICTORY"), 500);
          }
        }
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  };

  const progressPercentage =
    cards.length > 0 ? (solved.length / cards.length) * 100 : 0;

  return (
    <div className="app-container">
      {/* ================= ECRAN 1 : SETUP ================= */}
      {gameState === "SETUP" && (
        <div className="screen-center fade-in">
          <div className="text-center mb-4">
            <div className="app-icon mb-3">
              <span className="emoji-large">🧠</span>
            </div>
            <h1 className="title-main">NeuroFlash</h1>
            <p className="subtitle">Train your memory, one match at a time</p>
          </div>

          <div className="setup-card">
            {/* LEVEL CONTROL */}
            <div className="control-group">
              <label className="control-label">LEVEL</label>
              <div className="segmented-control">
                <div
                  className={`segment ${level === 8 ? "active" : ""}`}
                  onClick={() => setLevel(8)}
                >
                  4x4
                </div>
                <div
                  className={`segment ${level === 12 ? "active" : ""}`}
                  onClick={() => setLevel(12)}
                >
                  4x6
                </div>
              </div>
              <p className="helper-text">
                {level === 8
                  ? "16 cards · 8 pairs · Standard"
                  : "24 cards · 12 pairs · Extended"}
              </p>
            </div>

            {/* THEME CONTROL */}
            <div className="control-group">
              <label className="control-label">THEME</label>
              <div className="segmented-control">
                <div
                  className={`segment ${theme === "Nature" ? "active" : ""}`}
                  onClick={() => setTheme("Nature")}
                >
                  Nature
                </div>
                <div
                  className={`segment ${theme === "Tech" ? "active" : ""}`}
                  onClick={() => setTheme("Tech")}
                >
                  Tech
                </div>
              </div>
              <p className="helper-text">
                {theme === "Nature"
                  ? "🌿 Flora & fauna emojis"
                  : "💻 Gadgets & tech emojis"}
              </p>
            </div>

            <button className="btn-primary w-100" onClick={startGame}>
              Start Game ➔
            </button>
          </div>
        </div>
      )}

      {/* ================= ECRAN 2 : PLAYING ================= */}
      {gameState === "PLAYING" && (
        <div className="game-screen fade-in">
          {/* HEADER */}
          <header className="game-header">
            <button className="btn-back" onClick={() => setGameState("SETUP")}>
              ← Menu
            </button>
            <div className="header-title">🧠 NeuroFlash</div>
            <div className="header-stats">
              <strong>{moves}</strong>
              <span>Moves</span>
            </div>
          </header>

          {/* PROGRESS BAR */}
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* GRID */}
          <div className="grid-wrapper">
            <div
              className={`memory-grid ${level === 8 ? "grid-4x4" : "grid-4x6"}`}
            >
              {cards.map((card, index) => {
                const isFlipped =
                  flipped.includes(index) || solved.includes(index);
                return (
                  <div
                    key={index}
                    className={`memory-card ${isFlipped ? "flipped" : ""}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="card-inner">
                      <div className="card-front">
                        <span>?</span>
                      </div>
                      <div className="card-back">
                        <span className="card-emoji">{card.symbol}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div className="game-footer">
            {solved.length / 2} / {cards.length / 2} pairs matched
            <div className="help-icon">?</div>
          </div>
        </div>
      )}

      {/* ================= ECRAN 3 : VICTORY ================= */}
      {gameState === "VICTORY" && (
        <div className="screen-center fade-in text-center">
          <div className="victory-particles mb-3">🌿 ✨ 🍃 ⭐ 🌱</div>
          <div className="app-icon mb-4 mx-auto">
            <span className="emoji-large">🎉</span>
          </div>

          <h1 className="title-main mb-2">You Did It!</h1>
          <p className="subtitle mb-5">You cleared the board</p>

          <div className="score-card mb-5">
            <label className="control-label">TOTAL MOVES</label>
            <div className="score-number">{moves}</div>
          </div>

          <button
            className="btn-primary"
            style={{ width: "200px" }}
            onClick={() => setGameState("SETUP")}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

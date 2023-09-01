import GameBoard from './components/GameBoard.jsx';
import DifficultySelection from './components/DifficultySelection.jsx';
import GameEndModal from './components/GameEndModal.jsx';
import { useState } from 'react';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState(null); // null, 'easy', 'medium', 'hard'
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);

  let numCards, numShownCards;
  if (difficulty === 'easy') {
    numCards = 5;
    numShownCards = 3;
  } else if (difficulty === 'medium') {
    numCards = 7;
    numShownCards = 4;
  } else if (difficulty === 'hard') {
    numCards = 10;
    numShownCards = 5;
  }

  const showGameStatus = gameStatus !== 'playing';

  function handleScoreIncrease() {
    setScore(score + 1);
  }

  function handleGameFinished(won) {
    setGameStatus(won ? 'won' : 'lost');
  }

  function handleReset() {
    setGameStatus('playing');
    setScore(0);
  }

  function handleGoToMainMenu() {
    setDifficulty(null);
    setGameStatus('playing');
    setScore(0);
  }

  const gameBoardElement = (
    <GameBoard
      numCards={numCards}
      numShownCards={numShownCards}
      score={score}
      onGameFinished={handleGameFinished}
      onScoreIncrease={handleScoreIncrease}
      active={gameStatus === 'playing'}
    />
  );
  const diffSelectElement = <DifficultySelection onSelected={setDifficulty} />;
  const gameEndModalElement = (
    <GameEndModal
      won={gameStatus === 'won'}
      score={score}
      maxScore={numCards}
      onReset={handleReset}
      onGoToMainMenu={handleGoToMainMenu}
    />
  );

  return (
    <>
      {difficulty ? gameBoardElement : diffSelectElement}
      {showGameStatus && gameEndModalElement}
    </>
  );
}

export default App;

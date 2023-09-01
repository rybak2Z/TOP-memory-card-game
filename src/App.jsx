import GameBoard from './components/GameBoard.jsx';
import DifficultySelection from './components/DifficultySelection.jsx';
import GameEndModal from './components/GameEndModal.jsx';
import { useState } from 'react';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState(null); // null, 'easy', 'medium', 'hard'
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  let numCards;
  if (difficulty === 'easy') {
    numCards = 5;
  } else if (difficulty === 'medium') {
    numCards = 7;
  } else if (difficulty === 'hard') {
    numCards = 10;
  }

  const showGameStatus = gameStatus !== 'playing';

  function handleGameFinished(won) {
    setGameStatus(won ? 'won' : 'lost');
  }

  function handleReset() {
    setGameStatus('playing');
  }

  function handleGoToMainMenu() {
    setDifficulty(null);
    setGameStatus('playing');
  }

  const gameBoardElement = (
    <GameBoard
      numCards={numCards}
      onGameFinished={handleGameFinished}
      active={gameStatus === 'playing'}
    />
  );
  const diffSelectElement = <DifficultySelection onSelected={setDifficulty} />;
  const gameEndModalElement = (
    <GameEndModal
      won={gameStatus === 'won'}
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

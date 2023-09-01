function GameEndModal({ won, score, maxScore, onReset, onGoToMainMenu }) {
  const gameStatusText = won ? 'You won!' : 'Game over';

  return (
    <div className='modal'>
      Score: {score} / {maxScore}
      {gameStatusText}
      {!won && <button onClick={onReset}>Restart</button>}
      <button onClick={onGoToMainMenu}>Main Menu</button>
    </div>
  );
}

export default GameEndModal;

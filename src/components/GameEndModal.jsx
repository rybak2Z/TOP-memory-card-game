import '../styles/GameEndModal.css';

function GameEndModal({ won, score, maxScore, onReset, onGoToMainMenu }) {
  const gameStatusText = won ? 'You won!' : 'Game over';

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <h1>{gameStatusText}</h1>
        {!won && (
          <h2>
            Score: {score} / {maxScore}
          </h2>
        )}
        <div className='buttons'>
          {!won && <button onClick={onReset}>Restart</button>}
          <button onClick={onGoToMainMenu}>Main Menu</button>
        </div>
      </div>
    </div>
  );
}

export default GameEndModal;

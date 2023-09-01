function GameEndModal({ won, onReset, onGoToMainMenu }) {
  const gameStatusText = won ? 'You won!' : 'Game over';

  return (
    <div className='modal'>
      {gameStatusText}
      {!won && <button onClick={onReset}>Restart</button>}
      <button onClick={onGoToMainMenu}>Main Menu</button>
    </div>
  );
}

export default GameEndModal;

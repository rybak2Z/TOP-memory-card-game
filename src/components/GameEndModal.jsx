function GameEndModal({ gameStatusText, onReset }) {
  return (
    <div className='modal'>
      {gameStatusText}
      <button onClick={onReset}>Restart</button>
    </div>
  );
}

export default GameEndModal;

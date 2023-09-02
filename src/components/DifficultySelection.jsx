import '../styles/DifficultySelection.css';

function DifficultySelection({ onSelected }) {
  return (
    <div className='diff-selection'>
      <button onClick={() => onSelected('easy')}>
        <div>Easy</div>
      </button>
      <button onClick={() => onSelected('medium')}>
        <div>Medium</div>
      </button>
      <button onClick={() => onSelected('hard')}>
        <div>Hard</div>
      </button>
    </div>
  );
}

export default DifficultySelection;

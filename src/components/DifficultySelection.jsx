function DifficultySelection({ onSelected }) {
  return (
    <div>
      <button onClick={() => onSelected('easy')}>Easy</button>
      <button onClick={() => onSelected('medium')}>Medium</button>
      <button onClick={() => onSelected('hard')}>Hard</button>
    </div>
  );
}

export default DifficultySelection;

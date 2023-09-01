function DifficultySelection({ onDifficultySelected }) {
  return (
    <div>
      <button onClick={() => onDifficultySelected(5)}>Easy</button>
      <button onClick={() => onDifficultySelected(7)}>Medium</button>
      <button onClick={() => onDifficultySelected(10)}>Hard</button>
    </div>
  );
}

export default DifficultySelection;

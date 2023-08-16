import Card from './Card.jsx';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F'];

function GameBoard() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {allCards.map((cardName) => (
        <Card key={cardName} label={cardName} />
      ))}
    </div>
  );
}

export default GameBoard;

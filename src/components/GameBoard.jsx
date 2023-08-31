import Card from './Card.jsx';
import { useState } from 'react';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F'];

function createCardDeck(cardLabels, clickHandler) {
  const deck = cardLabels.map((cardName) => (
    <Card key={cardName} label={cardName} onClick={clickHandler} />
  ));
  return deck;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}

function GameBoard() {
  const [cardDeck, setCardDeck] = useState(allCards);

  function handleClick() {
    const deckCopy = [...cardDeck];
    shuffleArray(deckCopy);
    setCardDeck(deckCopy);
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {createCardDeck(cardDeck, handleClick)}
    </div>
  );
}

export default GameBoard;

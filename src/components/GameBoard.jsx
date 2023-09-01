import Card from './Card.jsx';
import { useState } from 'react';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

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

function chooseRandomN(array, n) {
  const arrayCopy = [...array];
  shuffleArray(arrayCopy);
  return arrayCopy.slice(0, n);
}

function GameBoard({ numCards, onGameFinished, active }) {
  const [cardDeck, setCardDeck] = useState(chooseRandomN(allCards, numCards));
  const [clickedCards, setClickedCards] = useState([]);

  function handleClick(label) {
    if (!active) {
      return;
    }

    const deckCopy = [...cardDeck];
    shuffleArray(deckCopy);
    setCardDeck(deckCopy);

    if (clickedCards.includes(label)) {
      onGameFinished(false);
      setClickedCards([]);
    } else if (clickedCards.length + 1 === cardDeck.length) {
      onGameFinished(true);
      setClickedCards([...clickedCards, label]);
    } else {
      setClickedCards([...clickedCards, label]);
    }
  }

  return (
    <>
      <p>Score: {clickedCards.length}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {createCardDeck(cardDeck, handleClick)}
      </div>
    </>
  );
}

export default GameBoard;

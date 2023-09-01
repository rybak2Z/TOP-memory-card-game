import Card from './Card.jsx';
import GameEndModal from './GameEndModal.jsx';
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
  const [clickedCards, setClickedCards] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  function handleClick(label) {
    if (gameStatus !== 'playing') {
      return;
    }

    const deckCopy = [...cardDeck];
    shuffleArray(deckCopy);
    setCardDeck(deckCopy);

    if (clickedCards.includes(label)) {
      setGameStatus('lost');
    } else if (clickedCards.length + 1 === allCards.length) {
      setGameStatus('won');
      setClickedCards([...clickedCards, label]);
    } else {
      setClickedCards([...clickedCards, label]);
    }
  }

  function handleReset() {
    setCardDeck(allCards);
    setClickedCards([]);
    setGameStatus('playing');
  }

  const showGameStatus = gameStatus !== 'playing';
  const gameStatusText = gameStatus === 'won' ? 'You won!' : 'Game over';

  return (
    <>
      <p>Score: {clickedCards.length}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {createCardDeck(cardDeck, handleClick)}
      </div>
      {showGameStatus && (
        <GameEndModal gameStatusText={gameStatusText} onReset={handleReset} />
      )}
    </>
  );
}

export default GameBoard;

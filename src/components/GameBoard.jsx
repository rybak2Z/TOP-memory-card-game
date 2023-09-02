import Card from './Card.jsx';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function createCardDeck(cardLabels, numShownCards, hideCards, clickHandler) {
  const shownCards = cardLabels.slice(0, numShownCards);
  const deck = shownCards.map((cardName, idx) => {
    return (
      <Card
        key={idx}
        label={cardName}
        hide={hideCards}
        onClick={clickHandler}
      />
    );
  });
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

function GameBoard({
  numCards,
  numShownCards,
  score,
  onGameFinished,
  onScoreIncrease,
  active,
}) {
  const [cardDeck, setCardDeck] = useState(chooseRandomN(allCards, numCards));
  const [clickedCards, setClickedCards] = useState([]);
  const [hideCards, setHideCards] = useState(false);
  const timeoutIds = useRef([]);

  function handleClick(label) {
    if (!active) {
      return;
    }

    if (clickedCards.includes(label)) {
      gameOver();
    } else if (clickedCards.length + 1 === cardDeck.length) {
      gameWon(label);
    } else {
      nextGameStep(label);
    }
  }

  function gameOver() {
    onGameFinished(false);
    setClickedCards([]);
  }

  function gameWon(newCardClicked) {
    onGameFinished(true);
    setClickedCards([...clickedCards, newCardClicked]);
    onScoreIncrease();
  }

  function nextGameStep(newCardClicked) {
    setClickedCards([...clickedCards, newCardClicked]);
    onScoreIncrease();
    setHideCards(true);
    manageCardHideAnimation();
  }

  function manageCardHideAnimation() {
    const timeoutIdUpdateCards = setUpdateCardsTimeout();
    const timeoutIdUnhideCards = setUnhideCardsTimeout();
    timeoutIds.current.push(timeoutIdUpdateCards, timeoutIdUnhideCards);
  }

  function setUpdateCardsTimeout() {
    const timeoutId = setTimeout(() => {
      const deckCopy = [...cardDeck];
      shuffleArray(deckCopy);
      setCardDeck(deckCopy);
    }, 750);

    return timeoutId;
  }

  function setUnhideCardsTimeout() {
    const timeoutId = setTimeout(() => {
      setHideCards(false);
    }, 1500);

    return timeoutId;
  }

  useEffect(() => {
    if (!hideCards) {
      while (timeoutIds.current.length > 0) {
        const id = timeoutIds.current.pop();
        clearTimeout(id);
      }
    }
  }, [hideCards]);

  return (
    <>
      <p>
        Score: {score} / {numCards}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {createCardDeck(cardDeck, numShownCards, hideCards, handleClick)}
      </div>
    </>
  );
}

export default GameBoard;

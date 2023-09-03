import Card from './Card.jsx';
import { randomInt, shuffleArray, chooseRandomN } from '../utils.js';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import '../styles/GameBoard.css';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function createCardDeck(cards, shownCardsIdxs, flipCards, clickHandler) {
  const shownCards = [];
  for (const [i, cardIdx] of shownCardsIdxs.entries()) {
    const card = cards[cardIdx];
    shownCards.push(
      <Card
        key={i}
        cardIdx={cardIdx}
        label={card}
        flip={flipCards}
        onClick={clickHandler}
      />,
    );
  }

  return shownCards;
}

function ensureContainsUnclickedCard(cards, shownCardsIdxs, clickedCardsIdxs) {
  // Make sure that there is at least one card that has not been clicked yet
  // to prevent cases where any click would lead to losing the game
  const noClickableCard = shownCardsIdxs.every((cardIdx) =>
    clickedCardsIdxs.includes(cardIdx),
  );

  if (noClickableCard) {
    const cardsIdxs = [...cards.keys()];
    const unclickedCardsIdxs = cardsIdxs.filter(
      (cardIdx) => !clickedCardsIdxs.includes(cardIdx),
    );
    const [unclickedCardIdx] = chooseRandomN(unclickedCardsIdxs, 1);

    const newShownCardsIdxs = [...shownCardsIdxs];
    newShownCardsIdxs[randomInt(newShownCardsIdxs.length)] = unclickedCardIdx;

    return newShownCardsIdxs;
  }

  return shownCardsIdxs;
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
  const [clickedCardsIdxs, setClickedCardsIdxs] = useState([]);
  const [shownCardsIdxs, setShownCardsIdxs] = useState(
    chooseRandomN(cardDeck.keys(), numShownCards),
  );
  const [flipCards, setFlipCards] = useState(false);
  const timeoutIds = useRef([]);

  function handleClick(cardIdx) {
    if (!active) {
      return;
    }

    if (clickedCardsIdxs.includes(cardIdx)) {
      gameOver();
    } else if (clickedCardsIdxs.length + 1 === cardDeck.length) {
      gameWon(cardIdx);
    } else {
      nextGameStep(cardIdx);
    }
  }

  function gameOver() {
    onGameFinished(false);
    setClickedCardsIdxs([]);
    updateCards([]);
  }

  function gameWon() {
    onGameFinished(true);
    onScoreIncrease();
  }

  function nextGameStep(clickedCardIdx) {
    const newClickedCardsIdxs = [...clickedCardsIdxs, clickedCardIdx];
    setClickedCardsIdxs(newClickedCardsIdxs);
    onScoreIncrease();
    setFlipCards(true);
    manageCardFlipAnimation(newClickedCardsIdxs);
  }

  function manageCardFlipAnimation(newClickedCardsIdxs) {
    const timeoutIdUpdateCards = setUpdateCardsTimeout(newClickedCardsIdxs);
    const timeoutIdUnflipCards = setUnflipCardsTimeout();
    timeoutIds.current.push(timeoutIdUpdateCards, timeoutIdUnflipCards);
  }

  function setUpdateCardsTimeout(newClickedCardsIdxs) {
    const timeoutId = setTimeout(() => {
      updateCards(newClickedCardsIdxs);
    }, 750);

    return timeoutId;
  }

  function updateCards(newClickedCardsIdxs) {
    let newShownCardsIdxs = chooseRandomN(cardDeck.keys(), numShownCards);
    newShownCardsIdxs = ensureContainsUnclickedCard(
      cardDeck,
      newShownCardsIdxs,
      newClickedCardsIdxs,
    );
    shuffleArray(newShownCardsIdxs);
    setShownCardsIdxs(newShownCardsIdxs);
  }

  function setUnflipCardsTimeout() {
    const timeoutId = setTimeout(() => {
      setFlipCards(false);
    }, 1500);

    return timeoutId;
  }

  useEffect(() => {
    if (!flipCards) {
      while (timeoutIds.current.length > 0) {
        const id = timeoutIds.current.pop();
        clearTimeout(id);
      }
    }
  }, [flipCards]);

  return (
    <div className='game-board'>
      <p>
        <span>
          Score: {score} / {numCards}
        </span>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {createCardDeck(cardDeck, shownCardsIdxs, flipCards, handleClick)}
      </div>
    </div>
  );
}

export default GameBoard;

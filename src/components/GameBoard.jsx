import Card from './Card.jsx';
import { randomInt, shuffleArray, chooseRandomN } from '../utils.js';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function createCardDeck(cards, shownCardsIdxs, hideCards, clickHandler) {
  const shownCards = [];
  for (const [i, cardIdx] of shownCardsIdxs.entries()) {
    const card = cards[cardIdx];
    shownCards.push(
      <Card
        key={i}
        cardIdx={cardIdx}
        label={card}
        hide={hideCards}
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
  const [hideCards, setHideCards] = useState(false);
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
  }

  function gameWon() {
    onGameFinished(true);
    onScoreIncrease();
  }

  function nextGameStep(clickedCardIdx) {
    const newClickedCardsIdxs = [...clickedCardsIdxs, clickedCardIdx];
    setClickedCardsIdxs(newClickedCardsIdxs);
    onScoreIncrease();
    setHideCards(true);
    manageCardHideAnimation(newClickedCardsIdxs);
  }

  function manageCardHideAnimation(newClickedCardsIdxs) {
    const timeoutIdUpdateCards = setUpdateCardsTimeout(newClickedCardsIdxs);
    const timeoutIdUnhideCards = setUnhideCardsTimeout();
    timeoutIds.current.push(timeoutIdUpdateCards, timeoutIdUnhideCards);
  }

  function setUpdateCardsTimeout(newClickedCardsIdxs) {
    const timeoutId = setTimeout(() => {
      let newShownCardsIdxs = chooseRandomN(cardDeck.keys(), numShownCards);
      newShownCardsIdxs = ensureContainsUnclickedCard(
        cardDeck,
        newShownCardsIdxs,
        newClickedCardsIdxs,
      );
      shuffleArray(newShownCardsIdxs);
      setShownCardsIdxs(newShownCardsIdxs);
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
        {createCardDeck(cardDeck, shownCardsIdxs, hideCards, handleClick)}
      </div>
    </>
  );
}

export default GameBoard;

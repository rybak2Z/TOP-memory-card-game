import Card from './Card.jsx';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const allCards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function createCardDeck(cards, shownCardsIdxs, hideCards, clickHandler) {
  const shownCards = [];
  for (const [i, cardIdx] of shownCardsIdxs.entries()) {
    const card = cards[cardIdx];
    shownCards.push(
      <Card key={i} label={card} hide={hideCards} onClick={clickHandler} />,
    );
  }

  return shownCards;
}

function ensureContainsUnclickedCard(cards, shownCardsIdxs, clickedCards) {
  // Make sure that there is at least one card that has not been clicked yet
  // to prevent cases where any click would lead to losing the game
  const shownCards = shownCardsIdxs.map((idx) => cards[idx]);
  const noClickableCard = shownCards.every((card) =>
    clickedCards.includes(card),
  );

  if (noClickableCard) {
    const unclickedCards = cards.filter((card) => !clickedCards.includes(card));
    // console.log("unclicked cards", unclickedCards);
    const [unclickedCard] = chooseRandomN(unclickedCards, 1);
    const unclickedCardIdx = cards.indexOf(unclickedCard);

    const newShownCardsIdxs = [...shownCardsIdxs];
    newShownCardsIdxs[randomInt(newShownCardsIdxs.length)] = unclickedCardIdx;

    return newShownCardsIdxs;
  }

  return shownCardsIdxs;
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
  const [shownCardsIdxs, setShownCardsIdxs] = useState(
    chooseRandomN(cardDeck.keys(), numShownCards),
  );
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

  function gameWon() {
    onGameFinished(true);
    onScoreIncrease();
  }

  function nextGameStep(newCardClicked) {
    const newClickedCards = [...clickedCards, newCardClicked];
    setClickedCards(newClickedCards);
    onScoreIncrease();
    setHideCards(true);
    manageCardHideAnimation(newClickedCards);
  }

  function manageCardHideAnimation(newClickedCards) {
    const timeoutIdUpdateCards = setUpdateCardsTimeout(newClickedCards);
    const timeoutIdUnhideCards = setUnhideCardsTimeout();
    timeoutIds.current.push(timeoutIdUpdateCards, timeoutIdUnhideCards);
  }

  function setUpdateCardsTimeout(newClickedCards) {
    const timeoutId = setTimeout(() => {
      let newShownCardsIdxs = chooseRandomN(cardDeck.keys(), numShownCards);
      newShownCardsIdxs = ensureContainsUnclickedCard(
        cardDeck,
        newShownCardsIdxs,
        newClickedCards,
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

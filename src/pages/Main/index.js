import './style.css';
import { useState } from 'react';
import cardsList from '../../cards.js';
import puzzleLogo from '../../assets/vector.svg';
import cardBack from '../../assets/card-back.png';

function Main() {
  const [cards, setCards] = useState(cardsList);

  const [cardVerify, setCardVerify] = useState({
    cardTrunedNow: false,
    cardTurnedValue: ''
  });

  const [points, setPoints] = useState(0);
  const [status, setStatus] = useState(false);

  function handleFlipCard(cardIndex, cardTurned, cardSlug) {
    const { cardTrunedNow, cardTurnedValue } = cardVerify
    const localCards = [...cards];

    if (cardTurned) {
      return;
    }

    const findCard = localCards.findIndex((card) => { return card === localCards[cardIndex] });

    localCards[findCard].turned = true;

    if (!cardTrunedNow) {
      setCardVerify({
        cardTrunedNow: true,
        cardTurnedValue: cardSlug
      })

    } else {
      setStatus(true);

      setTimeout(() => {
        const localCards = [...cards];
        if (cardTurnedValue === cardSlug) {
          for (let i = 0; i < 2; i++) {
            localCards.splice(localCards.findIndex((card) => {
              return card.slug === cardSlug
            }), 1)
          }
          setPoints(points + 1);

          resetCardVerify();
        }

        localCards.forEach((card) => {
          return card.turned = false;
        })

        resetCardVerify();
        setCards(localCards);

      }, 1500)
    }

    setCards(localCards);
  }

  function scramblerCards(localCards) {

    for (let i = 0; i < localCards.length; i++) {
      let p = Math.trunc(Math.random() * localCards.length);
      let aux = localCards[p];
      localCards[p] = localCards[i]
      localCards[i] = aux
    }
    return setCards(localCards);
  }

  function handleReset() {
    const localCards = [...cardsList];

    localCards.forEach((card) => {
      return card.turned = false;
    })

    scramblerCards(localCards)
    resetCardVerify();

    setPoints(0);
  }

  function resetCardVerify() {
    setCardVerify({
      cardTrunedNow: false,
      cardTurnedValue: ''
    })
    setStatus(false)
  }

  return (
    <div className='container'>

      <div className='sidebar'>
        <div className='logo'>
          <img src={puzzleLogo} alt='puzzle-logo' />
          <strong>CUBOS PUZZLE</strong>
        </div>
        <button
          onClick={() => handleReset()}
        >RESET</button>
      </div>

      <div
        className={
          `cards 
          ${points === 6
            ? 'congratsChampion'
            : null
          }
          `}
      >
        {cards.map((card, index) => (
          <button
            disabled={status}
            key={index}
            onClick={() => handleFlipCard(index, card.turned, card.slug)}
          >
            <img
              src={!card.turned ? cardBack : card.image}
              alt={card.slug} />
          </button>
        ))}
      </div>
    </div >
  );
}

export default Main;

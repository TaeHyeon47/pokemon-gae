import React, { Fragment } from 'react';
import './Pokecard.css';

const Pokecard = ({ pokeCard, choice }) => {
  const cardChoice = () => {
    choice(pokeCard.src);
  };

  return (
    <Fragment>
      {/*  배열 사용시 Parent element는 항상 key property를 가지고 있어야 한다. */}
      <div className='card' onClick={cardChoice}>
        <div>
          <img className='front' src={pokeCard.src} alt='Pokemon Card' />
          <img className='back' src='/img/ball.jpg' alt='PokeBall Card' />
        </div>
      </div>
    </Fragment>
  );
};

export default Pokecard;

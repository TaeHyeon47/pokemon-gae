import './App.css';
import { useEffect, useState } from 'react';
import Pokecard from './component/Pokecard';

// 이미지 파일명은 변경되지 않으므로 Component 밖에서 const로 선언
const pokeCardImages = [
  { src: 'img/purin.jpg', matched: false },
  { src: 'img/digda.jpg', matched: false },
  { src: 'img/marin.jpg', matched: false },
  { src: 'img/pairi.jpg', matched: false },
  { src: 'img/pantem.jpg', matched: false },
  { src: 'img/picacu.jpg', matched: false },
];

function App() {
  // 포켓몬 카드 State
  const [pokeCards, setPokeCards] = useState([]);
  // 시도 횟수 State
  const [turns, setTurns] = useState(0);
  // 선택된 카드 State
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // 포켓몬 카드순서 랜덤 변경
  const mixCards = () => {
    // ... Spread Operater를 한번만 사용한다면, pokeCardImages와 mixedcards는 사실상 같은 값이된다.
    const mixedCards = [...pokeCardImages, ...pokeCardImages]
      // sort 메소드는 function의 return 값이 0보다 작으면 변경사항이 없다.
      // 반면, 0보다 큰 숫자가 오면 숫자가 변경되게 된다.
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map((card) => {
        return { ...card, id: Math.random() };
      });

    setFirstChoice(null);
    setSecondChoice(null);

    // 포켓몬카드 순서 변경
    setPokeCards(mixedCards);
    // 시도 횟수 초기화
    setTurns(0);
  };

  // 카드 선택
  const cardChoiceHandler = (pokeCard) => {
    firstChoice ? setSecondChoice(pokeCard) : setFirstChoice(pokeCard);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setPokeCards((preveState) => {
          return preveState.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetValue();
      } else {
        setTimeout(() => {
          resetValue();
        }, 700);
      }
    }
  }, [firstChoice, secondChoice]);

  console.log(pokeCards);

  // 카드 선택 초기화와 턴 횟수 계산
  const resetValue = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((preveState) => {
      return (preveState += 1);
    });
    setDisabled(false);
  };

  // 첫 랜딩 시, 게임 자동 시작
  useEffect(() => {
    mixCards();
  }, []);

  return (
    <div className='App'>
      <h1>포켓몬 같은그림 찾기 게임</h1>
      <button onClick={mixCards}>새 게임</button>

      <div className='card-grid'>
        {pokeCards.map((pokeCard) => (
          <Pokecard
            key={pokeCard.id}
            pokeCard={pokeCard}
            choiceHandle={cardChoiceHandler}
            flipped={
              pokeCard === firstChoice ||
              pokeCard === secondChoice ||
              pokeCard.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>시도횟수 : {turns}</p>
    </div>
  );
}

export default App;

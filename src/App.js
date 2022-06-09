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
  // 점수 State
  const [score, setScore] = useState(20);
  // 최대 점수 State
  const [maxScore, setMaxScore] = useState(0);
  // 선택된 카드 State
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  // 여러번 클릭 버그 방지 State
  const [disabled, setDisabled] = useState(false);
  const [successGame, setSuccessGame] = useState(false);
  const [failGame, setFailGame] = useState(false);

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
    setScore(20);
  };

  // 카드 선택
  const cardChoiceHandler = (pokeCard) => {
    if (score) {
      firstChoice ? setSecondChoice(pokeCard) : setFirstChoice(pokeCard);
    } else {
      setDisabled(true);
      setFailGame(true);
      console.log('남은 점수가 없습니다.');
    }
  };

  // 첫번째, 두번째 카드 일치 확인
  useEffect(() => {
    // 첫번째, 두번째 카드가 있는 경우에만 실행
    if (firstChoice && secondChoice) {
      // 클릭 비활성화
      setDisabled(true);
      // 첫번째, 두번째 카드 일치 여부 확인
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
        // 선택 값 초기화
        resetValue();
      } else {
        setTimeout(() => {
          resetValue();
        }, 700);
        setScore((preveState) => {
          return (preveState -= 1);
        });
      }
    }
    // 클릭할 때마다 실행
  }, [firstChoice, secondChoice]);

  // 카드 선택 초기화와 턴 횟수 계산
  const resetValue = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    // 클릭 활성화
    setDisabled(false);
  };
  // 첫 랜딩 시, 게임 자동 시작
  useEffect(() => {
    mixCards();
  }, []);

  useEffect(() => {
    if (score < 20) {
      const winGame = pokeCards.find((card) => card.matched === false);
      if (!winGame) {
        console.log('게임에서 승리했습니다');
        setSuccessGame(true);
        if (score > maxScore) {
          setMaxScore(score);
        }
      }
    }
  }, [pokeCards, score, maxScore]);

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
      <p>
        {successGame ? '그림 찾기에 성공했습니다. 최대점수를 높여보세요!' : ''}
      </p>
      <p>{failGame ? '남은 점수가 없습니다. 새 게임을 시작하세요!' : ''}</p>
      <p>점수 : {score}</p>
      <p>최대점수 : {maxScore}</p>
    </div>
  );
}

export default App;

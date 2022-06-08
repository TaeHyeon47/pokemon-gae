import './App.css';
import { useState } from 'react';

// 이미지 파일은 변경되지 않으므로 Component 밖에서 const로 선언
const pokeCardImages = [
  { src: 'img/purin.jpg' },
  { src: 'img/digda.jpg' },
  { src: 'img/marin.jpg' },
  { src: 'img/pairi.jpg' },
  { src: 'img/pantem.jpg' },
  { src: 'img/picacu.jpg' },
];

function App() {
  // 포켓몬 카드 State
  const [pokeCards, setPokeCards] = useState([]);
  // 시도 횟수 State
  const [turns, setTurns] = useState(0);

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

    // 포켓몬카드 순서 변경
    setPokeCards(mixedCards);
    // 시도 횟수 초기화
    setTurns(0);
  };

  console.log(pokeCards, turns);

  return (
    <div className='App'>
      <h1>포켓몬 같은그림 찾기 게임</h1>
      <button onClick={mixCards}>새 게임</button>

      <div className='card-grid'>
        {pokeCards.map((pokeCard) => (
          // 배열 사용시 Parent element는 항상 key property를 가지고 있어야 한다.
          <div className='card' key={pokeCard.id}>
            <div>
              <img className='front' src={pokeCard.src} alt='Pokemon Card' />
              <img className='back' src='/img/ball.jpg' alt='PokeBall Card' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

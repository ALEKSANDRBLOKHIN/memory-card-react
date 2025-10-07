import { useEffect, useState } from "react";
import CardComp from "./components/CardComp";
import cards from "./data/cards.json";
import type { TCard, TCardList } from "./types/card.types";
import ModalComp from "./components/ModalComp";

const createGameCards = (): TCardList =>
  cards.flatMap((c) => [
    { ...c, id: c.id, flipped: false, matched: false },
    { ...c, id: c.id + 100, flipped: false, matched: false },
  ]);

const shuffleCards = (arr: TCardList): TCardList =>
  [...arr].sort(() => Math.random() - 0.5);

const App = () => {
  const [gameCards, setGameCards] = useState<TCardList>(() =>
    shuffleCards(createGameCards())
  );
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleCardClick = (clicked: TCard) => {
    if (locked || clicked.matched || clicked.flipped) return;
    if (flippedCards.length === 2) return;

    setGameCards((prev) =>
      prev.map((c) => (c.id === clicked.id ? { ...c, flipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, clicked.name]);
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;

    const [a, b] = flippedCards;
    setMoves((p) => p + 1);

    if (a === b) {
      setMatches((p) => p + 1);
      setGameCards((prev) =>
        prev.map((c) => (c.name === a ? { ...c, matched: true } : c))
      );
      setFlippedCards([]);
    } else {
      setLocked(true);
      setTimeout(() => {
        setGameCards((prev) =>
          prev.map((c) =>
            c.name === a || c.name === b ? { ...c, flipped: false } : c
          )
        );
        setFlippedCards([]);
        setLocked(false);
      }, 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (gameCards.length && matches === gameCards.length / 2) {
      setGameOver(true);
    }
  }, [matches, gameCards.length]);

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <p>Number of moves: {moves}</p>
      <div className="card_container">
        {gameCards.map((card: TCard) => (
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>
      <ModalComp showModal={gameOver} toggleModal={setGameOver} />
    </div>
  );
};

export default App;

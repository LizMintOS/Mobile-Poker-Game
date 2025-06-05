import { useState, useEffect } from "react";
import { Game } from "../games/types";

const useGameSessionStorage = (): [
  Game | null,
  (game: Game | null) => void
] => {
  const [game, setGameState] = useState<Game | null>(() => {
    const stored = sessionStorage.getItem("game");
    return stored ? (JSON.parse(stored) as Game) : null;
  });

  useEffect(() => {
    if (game) {
      sessionStorage.setItem("game", JSON.stringify(game));
    } else {
      sessionStorage.clear();
    }
  }, [game]);

  const setGame = (newGame: Game | null) => {
    setGameState(newGame);
  };

  return [game, setGame];
};

export default useGameSessionStorage;

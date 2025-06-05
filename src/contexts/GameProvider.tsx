import { useState, useContext, createContext, useEffect } from "react";
import { Game } from "../api/games/types";

interface GameContextType {
  game: Game | null;
  setGame: (game: Game | null) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within an GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    console.log("Game Context: ", game);
  }, [game])

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

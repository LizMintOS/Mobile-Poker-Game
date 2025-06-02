import { useState, useContext, createContext } from "react";
import { Game } from "../api/games/types";

interface GameContextType {
  game: Game | null;
  setGame: (game: Game | null) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useError = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

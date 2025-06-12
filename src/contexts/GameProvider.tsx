import { useContext, createContext, useEffect, useState } from "react";
import { Game } from "../api/games/types";
import useGameSessionStorage from "../api/hooks/useGameSessionStorage";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

interface GameContextType {
  game: Game | null;
  setGame: (game: Game | null) => void;
  clearGame: () => void;
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
  const [isWaiting, setIsWaiting] = useState(true);

  const [game, setGameState] = useState<Game | null>(() => {
    const stored = sessionStorage.getItem("game");
    return stored ? (JSON.parse(stored) as Game) : null;
  });

  const setGame = (newGame: Game | null) => {
    setGameState(newGame);
    if (newGame) {
      sessionStorage.setItem("game", JSON.stringify(newGame));
    } else {
      sessionStorage.removeItem("game");
    }
  };

  const clearGame = () => {
    setGameState(null);
    sessionStorage.removeItem("game");
  };

  useEffect(() => {
    setIsWaiting(false);
  }, []);

  return (
    <GameContext.Provider value={{ game, setGame, clearGame }}>
      <LoadingWrapper
        loading={isWaiting}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        size={80}
      >
        <>{children}</>
      </LoadingWrapper>
    </GameContext.Provider>
  );
};

import { useContext, createContext, useEffect, useState } from "react";
import { Game } from "../api/games/types";
import useGameSessionStorage from "../api/hooks/useGameSessionStorage";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

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
  const [game, setGame] = useGameSessionStorage();
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [game]);

  return (
    <GameContext.Provider value={{ game, setGame }}>
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

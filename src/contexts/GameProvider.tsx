import { useContext, createContext, useEffect, useState } from "react";
import { Game } from "../api/games/types";
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

  const [game, setGame] = useState<Game | null>(null);

  const clearGame = () => {
    setGame(null);
  }

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

import { useContext, createContext, useEffect, useState } from "react";
import { Game } from "../api/games/types";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGameIdStorage } from "../api/hooks/useGameIdStorage";
import { listenToGame } from "../api/games/functions";

interface GameContextType {
  game: Game | null;
  gameId: string | null;
  setGame: (game: Game | null) => void;
  clearGame: () => void;
  setGameId: (gameId: string) => void;
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
  const { getGameId, deleteGameId, setGameIdStore } = useGameIdStorage();

  const [isWaiting, setIsWaiting] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [gameId, setGameId] = useState<string | null>(getGameId());

  const clearGame = () => {
    deleteGameId();
    setGameId(null);
  };

  useEffect(() => {
    setIsWaiting(true);
    console.log(gameId);
    if (gameId) {
      const unsubscribe = listenToGame(gameId, (game) => {
        setGame(game);
        console.log("GProv Game Found: ", game!.id)
        setIsWaiting(false);
      });
      return () => unsubscribe();
    } else setGame(null);
    setIsWaiting(false);
    console.log("Game Context: ", gameId);
  }, [listenToGame, gameId]);

  const handleSetGameId = (newGameId: string) => {
    setGameId(newGameId);
    setGameIdStore(newGameId);
  };

  return (
    <GameContext.Provider
      value={{ game, gameId, setGame, clearGame, setGameId: handleSetGameId }}
    >
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

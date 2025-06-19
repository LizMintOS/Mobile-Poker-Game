import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Game } from "../api/games/types";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGameIdStorage } from "../hooks/useGameIdStorage";
import { subscribeToGameChanges } from "../api/games/GameProxy";

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

  const clearGame = useCallback(() => {
    deleteGameId();
    setGame(null);
    setGameId(null);
  }, []);

  useEffect(() => {
    setIsWaiting(true);

    if (!gameId) {
      setGame(null);
      setIsWaiting(false);
      return;
    }

    const unsubscribe = subscribeToGameChanges(gameId, (game) => {
      const latestId = getGameId();
      if (!game) {
        console.log("Game deleted? Verifying...");
        if (latestId === gameId) {
          console.log("Confirmed deleted. Clearing state.");
          clearGame();
        } else {
          console.log("Ignoring stale unsubscribe for old gameId.");
        }
      } else {
        setGame(game);
        console.log("GProv Game Found: ", game);
        setIsWaiting(false);
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  const handleSetGameId = (newGameId: string) => {
    console.log("Setting new Game ID: ", newGameId);
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

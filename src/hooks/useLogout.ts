import { useCallback } from "react";
import { useAuthProxy } from "../api/auth/AuthProxy";
import { useGameProxy } from "../api/games/GameProxy";
import { useAuth } from "../contexts/AuthProvider";
import { usePlayerProxy } from "src/api/players/PlayerProxy";
import { useGame } from "../contexts/GameProvider";

const useLogout = () => {
  const { logoutUser } = useAuthProxy();
  const { currentUser } = useAuth();
  const { game, gameId, clearGame } = useGame();
  const { deleteGame } = useGameProxy(currentUser);
  const { deletePlayer } = usePlayerProxy(currentUser);

  const handleLogout = useCallback(async () => {
    console.log("Logout Game: ", game?.id);

    if (game && gameId) {
      if (game.creatorId === currentUser!.uid) {
        console.log("Deleting Game");
        await deleteGame(gameId, clearGame);
      } else {
        console.log("Removing Player");
        await deletePlayer(currentUser!.uid, gameId, clearGame);
        console.log("Player removed. Logging out user...");
      }
    } else if (gameId && !game) {
      console.log("Removing Player");
      await deletePlayer(currentUser!.uid, gameId, clearGame);
      console.log("Player removed. Logging out user...");
    }

    logoutUser();

    console.log("Logged out");
  }, [currentUser, game, gameId, deleteGame, deletePlayer, clearGame]);

  return { handleLogout };
};

export default useLogout;

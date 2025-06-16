import { useCallback } from "react";
import { useAuthProxy } from "../api/auth/AuthProxy";
import { useGameProxy } from "../api/games/GameProxy";
import { useAuth } from "../contexts/AuthProvider";
import { usePlayerActions } from "../api/players/functions";
import { useGame } from "../contexts/GameProvider";

const useLogout = () => {
  const { logoutUser } = useAuthProxy();
  const { currentUser } = useAuth();
  const { game, clearGame } = useGame();
  const { deleteGame } = useGameProxy(currentUser);
  const { deletePlayer } = usePlayerActions(currentUser);

  const handleLogout = useCallback(async () => {
    console.log("Logout Game: ", game?.id)
    if (game) {
      const deleteGameItem = game;
      if (deleteGameItem.creatorId === currentUser!.uid) {
        console.log("Deleting Game")
        await deleteGame(deleteGameItem, clearGame);
      } else {
        console.log("Removing Player")
        await deletePlayer(currentUser!.uid, deleteGameItem, clearGame);
      }
    }
    await logoutUser();
  }, [logoutUser, currentUser, game, deleteGame, deletePlayer, clearGame]);

  return { handleLogout };
};

export default useLogout;

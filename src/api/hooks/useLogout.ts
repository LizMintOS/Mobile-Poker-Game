import { useCallback } from "react";
import { useAuthActions } from "../auth/functions";
import { useGameActions } from "../games/functions";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayerActions } from "../players/functions";
import { useGame } from "../../contexts/GameProvider";

const useLogout = () => {
  const { logoutUser } = useAuthActions();
  const { currentUser } = useAuth();
  const { game, clearGame } = useGame();
  const { deleteGame } = useGameActions(currentUser);
  const { deletePlayer } = usePlayerActions(currentUser);

  const handleLogout = useCallback(async () => {
    console.log("Logout Game: ", game?.id)
    if (game) {
      if (game.creatorId === currentUser!.uid) {
        console.log("Deleting Game")
        await deleteGame(game);
      } else {
        console.log("Removing Player")
        await deletePlayer(currentUser!.uid, game);
      }
      clearGame();
    }
    await logoutUser();
  }, [logoutUser, currentUser, game]);

  return { handleLogout };
};

export default useLogout;

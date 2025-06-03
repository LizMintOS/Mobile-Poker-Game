import { useCallback } from "react";
import { useAuthActions } from "../auth/functions";
import { useGameActions } from "../games/functions";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayerActions } from "../players/functions";
import { useGame } from "../../contexts/GameProvider";

const useLogout = () => {
  const { logoutUser } = useAuthActions();
  const { currentUser } = useAuth();
  const { game, setGame } = useGame();
  const { deleteGame } = useGameActions(currentUser);
  const { deletePlayer } = usePlayerActions(currentUser);

  const handleLogout = useCallback(async () => {
    if (game) {
      if (game.creatorId == currentUser!.uid) {
        await deleteGame(game);
        setGame(null);
      } else {
        await deletePlayer(currentUser!.uid, game);
      }
    }
    await logoutUser();
  }, [logoutUser, currentUser, game]);

  return { handleLogout };
};

export default useLogout;

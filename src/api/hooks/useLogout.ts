import { useCallback } from "react";
import { useAuthActions } from "../auth/functions";
import { useGameActions } from "../games/functions";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayerActions } from "../players/functions";

const useLogout = (gameId: string | null) => {
  const { logoutUser } = useAuthActions();
  const { currentUser } = useAuth();
  const { getGameByGameId, deleteGame } = useGameActions(currentUser);
  const { deletePlayer } = usePlayerActions(currentUser);

  const handleLogout = useCallback(async () => {
    if (gameId) {
      const game = await getGameByGameId(gameId);
      if (game.creatorId == currentUser!.uid) {
        await deleteGame(gameId);
      } else {
        await deletePlayer(currentUser!.uid, gameId);
      }
    }
    await logoutUser();
  }, [logoutUser, currentUser]);

  return { handleLogout };
};

export default useLogout;

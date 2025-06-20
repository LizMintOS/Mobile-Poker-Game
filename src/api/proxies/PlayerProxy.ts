import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";
import { useGameProxy } from "./GameProxy";
import { PlayerService } from "../services/PlayerService";
import { Game } from "../types";
import { Player } from "../types";
import { User } from "firebase/auth";
import { addCardsToHand, removeCardsFromDeck } from "../../utils/cards";
import { arrayUnion, increment } from "firebase/firestore";
import { LocalError } from "../errors/types";

export const usePlayerProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGameTransaction } = useGameProxy(user);
  const noAccessError: LocalError = { code: "permission-denied" };
  const userId: string | null = user ? user.uid : null;

  const handlePermissionError = (creatorId?: string): void => {
    if (!userId || (creatorId && creatorId !== userId)) throw noAccessError;
    return;
  };

  return {
    addPlayer: handleApiErrors(async (game: Game): Promise<void> => {
      handlePermissionError();
      const hand = addCardsToHand(game.deck, 5);

      if (userId) {
        const player = await PlayerService.addPlayerToGame(game, userId, hand);

        if (player === "success")
          await updateGameTransaction(game.id, {
            playerCount: game.playerCount + 1,
            deck: removeCardsFromDeck(game.deck, hand),
            turnOrder: arrayUnion(userId),
          });
        else throw player;
      }
    }),

    getPlayer: handleApiErrors(
      async (gameId: string): Promise<Player | void> => {
        if (userId) {
          handlePermissionError();
          const retrievedPlayer = await PlayerService.getPlayerData(
            userId,
            gameId
          );

          if (retrievedPlayer == "Player not found") throw retrievedPlayer;

          return retrievedPlayer as Player;
        }
        return;
      }
    ),

    updatePlayerTransaction: handleApiErrors(
      async (data: any, gameId: string, playerId: string): Promise<void> => {
        handlePermissionError(playerId);
        if (userId)
          await PlayerService.updatePlayerDataInTransaction(
            data,
            gameId,
            playerId
          );
      }
    ),

    deletePlayer: handleApiErrors(
      async (
        playerId: string,
        gameId: string,
        clearGame: () => void
      ): Promise<void> => {
        handlePermissionError(playerId);
        if (userId) {
          await PlayerService.deletePlayerFromGame(playerId, gameId);
          await updateGameTransaction(gameId, {
            playerCount: increment(-1),
          }).then(clearGame);
        }
      }
    ),
  };
};

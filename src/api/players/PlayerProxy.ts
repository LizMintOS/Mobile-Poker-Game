import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";
import { useGameProxy } from "../games/GameProxy";
import { PlayerService } from "./PlayerService";
import { Game } from "../games/types";
import { Player } from "./types";
import { User } from "firebase/auth";
import { addCardsToHand, removeCardsFromDeck } from "../../utils/cards";
import { arrayUnion, increment } from "firebase/firestore";
import { LocalError } from "../errors/types";

export const usePlayerProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGameTransaction } = useGameProxy(user);
  const noAccessError: LocalError = { code: "permission-denied" };

  if (!user) throw "Not authorized";

  const handlePermissionError = (playerId: string, creatorId?: string) => {
    if ((creatorId && creatorId !== user.uid) || playerId !== user.uid)
      throw noAccessError;
    return;
  };

  return {
    addPlayer: handleApiErrors(
      async (playerId: string, game: Game): Promise<void> => {
        handlePermissionError(playerId, game.creatorId);
        const hand = addCardsToHand(game.deck, 5);

        const player = await PlayerService.addPlayerToGame(
          game,
          playerId,
          hand
        );

        if (player === "success")
          await updateGameTransaction(game.id, {
            playerCount: game.playerCount + 1,
            deck: removeCardsFromDeck(game.deck, hand),
            turnOrder: arrayUnion(user.uid),
          });
        else throw player;
      }
    ),

    getPlayer: handleApiErrors(
      async (playerId: string, gameId: string): Promise<Player> => {
        handlePermissionError(playerId);
        const retrievedPlayer = await PlayerService.getPlayerData(
          playerId,
          gameId
        );

        if (retrievedPlayer == "Player not found") throw retrievedPlayer;

        return retrievedPlayer as Player;
      }
    ),

    updatePlayerTransaction: handleApiErrors(
      async (data: any, gameId: string, playerId: string): Promise<void> => {
        handlePermissionError(playerId);

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
        await PlayerService.deletePlayerFromGame(playerId, gameId);
        await updateGameTransaction(gameId, {
          playerCount: increment(-1),
        }).then(clearGame);
      }
    ),
  };
};

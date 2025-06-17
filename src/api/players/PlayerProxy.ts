import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";
import { useGameProxy } from "../games/GameProxy";
import { PlayerService } from "./PlayerService";
import { Game } from "../games/types";
import { Player } from "./types";
import { User } from "firebase/auth";
import { useCallback } from "react";
import { addCardsToHand, removeCardsFromDeck } from "../../utils/cards";
import { arrayUnion } from "firebase/firestore";
import { LocalError } from "../errors/types";

export const usePlayerProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGameTransaction } = useGameProxy(user);
  if (!user) throw "Not authorized";

  return {
    addPlayer: handleApiErrors(async (game: Game): Promise<void> => {
      if (!user) throw new Error("Not authorized");
      const hand = addCardsToHand(game.deck, 5);

      const player = await PlayerService.addPlayerToGame(game, user, hand);

      if (player === "success")
        await updateGameTransaction(game.id, {
          playerCount: game.playerCount + 1,
          deck: removeCardsFromDeck(game.deck, hand),
          turnOrder: arrayUnion(user.uid),
        });
      else throw player;
    }),

    getPlayer: handleApiErrors(
      async (playerId: string, gameId: string): Promise<Player> => {
        if (user.uid !== playerId)
          throw { code: "permission-denied" } as LocalError;
        const retrievedPlayer = await PlayerService.getPlayerData(
          playerId,
          gameId
        );

        if (retrievedPlayer == "Player not found") throw retrievedPlayer;

        return retrievedPlayer as Player;
      }
    ),
  };
};

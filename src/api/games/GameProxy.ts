import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";

import { GameService } from "./GameService";

import { Card } from "../../utils/cards";
import { User } from "firebase/auth";
import { Game } from "./types";

export const useGameProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const gameCache = new Map<string, Game>();

  return {
    createGame: handleApiErrors((deck: Card[], hand: Card[]): Promise<Game> => {
      if (!user) throw new Error("No user");
      return GameService.createGame(user, deck, hand);
    }),

    getGameByGameId: handleApiErrors(async (gameId: string) => {
      if (gameCache.has(gameId)) {
        return gameCache.get(gameId) as Game;
      }

      const game = await GameService.getGameByGameId(gameId);
      gameCache.set(gameId, game);
      return game;
    }),

    updateGame: handleApiErrors((gameId: string, data: any) =>
      GameService.updateGame(gameId, data)
    ),

    updateGameTransaction: handleApiErrors((gameId: string, data: any) =>
      GameService.updateGameTransaction(gameId, data)
    ),

    deleteGame: handleApiErrors((gameId: string, clearGame: () => void) =>
      GameService.deleteGame(gameId).then(clearGame)
    ),
  };
};

export const subscribeToGameChanges = GameService.listenToGame;

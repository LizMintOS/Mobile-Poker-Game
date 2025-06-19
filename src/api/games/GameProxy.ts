import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";

import { GameService } from "./GameService";

import { Card } from "../../utils/cards";
import { User } from "firebase/auth";
import { Game } from "./types";
import { LocalError } from "../errors/types";

export const useGameProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const noAccessError: LocalError = { code: "permission-denied" };

  return {
    createGame: handleApiErrors(
      async (deck: Card[], hand: Card[]): Promise<Game> => {
        if (!user) throw noAccessError;
        const newGame = await GameService.createGame(user, deck, hand);
        return newGame;
      }
    ),

    getGameByGameId: handleApiErrors(async (gameId: string) => {
      const game = await GameService.getGameByGameId(gameId);
      return game;
    }),

    updateGame: handleApiErrors(async (gameId: string, data: any) => {
      if (!user) throw noAccessError;
      const updatedGame = await GameService.updateGame(gameId, data);
      return updatedGame;
    }),

    updateGameTransaction: handleApiErrors(
      async (gameId: string, data: any) => {
        if (!user) throw noAccessError;
        await GameService.updateGameTransaction(gameId, data);
      }
    ),

    deleteGame: handleApiErrors(
      async (gameId: string, clearGame: () => void) => {
        if (!user) throw noAccessError;
        await GameService.deleteGame(gameId).then(clearGame);
      }
    ),
  };
};

export const subscribeToGameChanges = GameService.listenToGame;

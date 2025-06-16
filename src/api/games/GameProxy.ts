import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";

import { GameService } from "./GameService";

import { Card } from "../../utils/cards";
import { User } from "firebase/auth";
import { Game } from "./types";

export const useGameProxy = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  return {
    createGame: handleApiErrors((deck: Card[], hand: Card[]): Promise<Game> => {
      if (!user) throw new Error("No user");
      return GameService.createGame(user, deck, hand);
    }),

    getGameByGameId: handleApiErrors((gameId: string) =>
      GameService.getGameByGameId(gameId)
    ),

    updateGame: handleApiErrors((gameId: string, data: any) =>
      GameService.updateGame(gameId, data)
    ),

    updateGameTransaction: handleApiErrors((gameId: string, data: any) =>
      GameService.updateGameTransaction(gameId, data)
    ),

    deleteGame: handleApiErrors((game: Game, clearGame: () => void) =>
      GameService.deleteGame(game).then(clearGame)
    ),
  };
};

export const subscribeToGameChanges = GameService.listenToGame;

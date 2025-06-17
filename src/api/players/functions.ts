import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";
import { useGameProxy } from "../games/GameProxy";
import { db } from "../../services/firebase";
import {
  doc,
  onSnapshot,
  setDoc,
  increment,
  getDoc,
  deleteDoc,
  arrayUnion,
  runTransaction,
  Transaction,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Player } from "./types";

import { useCallback } from "react";
import { Game } from "../games/types";
import {
  addCardsToDeck,
  addCardsToHand,
  removeCardsFromDeck,
} from "../../utils/cards";

export const listenToPlayer = (
  gameId: string,
  playerId: string,
  callback: (playerData: Player) => void
) => {
  const playerDocRef = doc(db, "games", gameId, "players", playerId);

  const unsubscribe = onSnapshot(playerDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const playerData = { id: playerId, ...data.playerData } as Player;
      console.log("Player Listener FN: ", playerData);
      callback(playerData);
    } else {
      console.log("No such player document!");
      callback({ id: "", hand: [] });
    }
  });

  return unsubscribe;
};

export const usePlayerActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGameTransaction } = useGameProxy(user);

  const addPlayer = useCallback(
    handleApiErrors(async (game: Game): Promise<void> => {
      const path = `/games/${game.id}/players/${user!.uid}`;
      const hand = addCardsToHand(game.deck, 5);
      console.log("Creating player for game: ", game.id);

      const playerDoc = await getDoc(doc(db, path));

      if (!playerDoc.exists()) {
        console.log("Creating new player...");
        const playerDocRef = doc(db, path);
        await setDoc(playerDocRef, {
          hand: hand,
        });

        console.log("Player created");

        await updateGameTransaction(game.id, {
          playerCount: increment(1),
          deck: removeCardsFromDeck(game.deck, hand),
          turnOrder: arrayUnion(user!.uid),
        });
      } else {
        console.log("Already in game");
        throw "Already in game";
      }
    }),
    [handleApiErrors, user]
  );

  const getPlayer = useCallback(
    handleApiErrors(
      async (playerId: string, gameId: string): Promise<Player> => {
        console.log("retrieving player...");

        const playerDoc = await getDoc(
          doc(db, "games", gameId, "players", playerId)
        );

        if (!playerDoc.exists()) {
          throw "Player not found";
        }
        const playerData = playerDoc.data();

        const player: Player = {
          id: playerId,
          hand: playerData.playerData.hand,
        };

        console.log("Player data fetched:", player);

        return player;
      }
    ),
    [handleApiErrors]
  );

  const updatePlayerTransaction = useCallback(
    handleApiErrors(
      async (data: any, gameId: string, playerId: string): Promise<void> => {
        console.log("Updating transaction...");

        const playerRef = doc(db, "games", gameId, "players", playerId);

        await runTransaction(db, async (transaction: Transaction) => {
          transaction.update(playerRef, { ...data });
        });

        console.log("Updated!");
      }
    ),
    [handleApiErrors]
  );

  const deletePlayer = useCallback(
    handleApiErrors(
      async (
        playerId: string,
        gameId: string,
        clearGame: () => void
      ): Promise<void> => {
        console.log("Deleting player from game");

        await deleteDoc(doc(db, "games", gameId, "players", playerId));

        console.log("Player deleted. Updating player count...")

        await updateGameTransaction(gameId, {
          playerCount: increment(-1),
        });

        console.log("Player count updated. Clearing game...")

        clearGame();

        console.log("Game cleared")
      }
    ),
    [handleApiErrors]
  );

  return {
    listenToPlayer,
    addPlayer,
    getPlayer,
    deletePlayer,
    updatePlayerTransaction,
  };
};

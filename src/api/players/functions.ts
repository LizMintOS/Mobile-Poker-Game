import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { useGameActions } from "../games/functions";
import { db } from "../../services/firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  DocumentData,
  onSnapshot,
  setDoc,
  increment,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Player } from "./types";

import { useCallback } from "react";
import { Game } from "../games/types";
import { updateDeck } from "../../utils/shuffleCards";

export const usePlayerActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGame } = useGameActions(user);

  const listenToPlayer = (
    gameId: string,
    playerId: string,
    callback: (playerData: DocumentData | null) => void
  ) => {
    const playerDocRef = doc(db, "games", gameId, "players", playerId);

    const unsubscribe = onSnapshot(playerDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const playerData = docSnapshot.data();
        callback(playerData);
      } else {
        callback(null);
      }
    });

    return unsubscribe;
  };

  const addPlayer = useCallback(
    handleApiErrors(async (game: Game): Promise<void> => {
      const path = `/games/${game.id}/players/${user!.uid}`;
      const hand = game.deck.slice(game.deckIndex + 1, game.deckIndex + 6);
      console.log("Creating player for game: ", game.id);

      if (game.playerCount >= 8) {
        throw new Error("Game is already full.");
      }

      const playerDoc = await getDoc(doc(db, path));

      if (!playerDoc.exists()) {
        console.log("Creating new player...")
        const playerDocRef = doc(db, path);
        await setDoc(playerDocRef, {
          hand: hand,
          isTurn: false,
        } as Player);

        console.log("Player created");

        await updateGame(
          {
            playerCount: game.playerCount++,
            deckIndex: game.deckIndex + 5,
            deck: updateDeck(hand),
          },
          game.id
        );
      }
      else {
        throw new Error("You're already in this game");
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
          console.error("Player not found");
          throw new Error("Player not found");
        }

        const playerData = playerDoc.data() as Player;
        console.log("Game data fetched:", playerData);

        return playerData;
      }
    ),
    [handleApiErrors]
  );

  const deletePlayer = useCallback(
    handleApiErrors(async (playerId: string, gameId: string): Promise<void> => {
      console.log("Deleting player from game");

      await deleteDoc(doc(db, "games", gameId, "players", playerId));
    }),
    [handleApiErrors]
  );

  return {
    listenToPlayer,
    addPlayer,
    getPlayer,
    deletePlayer,
  };
};

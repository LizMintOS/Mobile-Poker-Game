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
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Player } from "./types";

import { useCallback } from "react";
import { Game } from "../games/types";

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
    handleApiErrors(async (game: Game): Promise<string> => {
      const path = `/games/${game.id}/players/${user!.uid}`;
      let player;
      console.log("Creating player for game: ", game.id);

      if (game.playerCount >= 8) {
        throw new Error("Game is already full.");
      }

      const playerDoc = await getDoc(doc(db, path));

      if (!playerDoc.exists()) {
        const playerCollectionRef = collection(db, path);
        player = await addDoc(playerCollectionRef, {
          hand: game.deck.slice(game.deckIndex + 1, game.deckIndex + 6),
          isTurn: false,
        } as Player);
      }

      if (player) {
        console.log("Player created with ID: ", player.id);

        await updateGame({ playerCount: game.playerCount++ }, game.id);

        return player.id;
      }
    }),
    [handleApiErrors, user]
  );

  return {
    listenToPlayer,
    addPlayer,
  };
};

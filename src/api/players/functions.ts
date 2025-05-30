import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { db } from "../../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Player } from "./types";

import { useGameActions } from "../games/functions";
import { useCallback } from "react";
import { Game } from "../games/types";

export const usePlayerActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { getGame } = useGameActions(user);

  const listenToPlayer = (
    gameId: string,
    playerId: string,
    callback: (playerData: DocumentData) => void
  ) => {
    const playerDocRef = doc(db, "games", gameId, "players", playerId);

    const unsubscribe = onSnapshot(playerDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const playerData = docSnapshot.data();
        callback(playerData);
      } else {
        console.log("No such player document!");
      }
    });

    // Return unsubscribe function so you can stop listening when needed
    return unsubscribe;
  };

  const addPlayer = useCallback(
    handleApiErrors(async (gameId: string, game: Game): Promise<string> => {
      console.log("Creating player for game: ", gameId);

      //get game data and ensure it exists
      // get players subcoll from game data

      const playerRef = await addDoc(
        collection(db, "games", game.id, "players", user!.uid),
        {
          hand: game.deck.slice(game.deckIndex + 1, game.deckIndex + 6),
          isTurn: false,
        } as Player
      );

      console.log("Player created with ID: ", playerRef.id);

      await updateDoc;
    }),
    [handleApiErrors]
  );
};

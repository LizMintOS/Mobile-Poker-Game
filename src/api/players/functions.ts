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
      console.log("Creating player for game: ", game.id);

      if (game.playerCount >= 8) {
        throw new Error("Game is already full.");
      }

      const playerRef = doc(db, "games", game.id, "players", user!.uid);
      
      await setDoc(playerRef, {
        hand: game.deck.slice(game.deckIndex + 1, game.deckIndex + 6),
        isTurn: false,
      } as Player);

      console.log("Player created with ID: ", playerRef.id);

      await updateGame({ playerCount: game.playerCount++ }, game.id);

      return playerRef.id;
    }),
    [handleApiErrors, user]
  );

  return {
    listenToPlayer,
    addPlayer,
  };
};

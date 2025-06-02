import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { db } from "../../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/shuffleCards";
import { useCallback } from "react";
import { Player } from "../players/types";

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const listenToGame = (
    gameId: string,
    callback: (gameData: DocumentData) => void
  ) => {
    const gameDocRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const gameData = docSnapshot.data();
        callback(gameData);
      } else {
        console.log("No such game document!");
      }
    });

    return unsubscribe;
  };

  const createGame = useCallback(
    handleApiErrors(
      async (deck: Card[], playerHand: Card[]): Promise<string> => {
        const gameRef = await addDoc(collection(db, "games"), {
          creatorId: user!.uid,
          hasStarted: false,
          playerCount: 1,
          deck: deck,
          deckIndex: 4,
          turn: 0,
          state: "lobby",
        } as Game);

        console.log("Game created with ID:", gameRef.id);

        const playerData: Player = {
          hand: [...playerHand],
          isTurn: true,
        };

        console.log("Adding player data:", playerData);

        await setDoc(doc(db, "games", gameRef.id, "players", user!.uid), {
          playerData,
        });

        console.log("Player data added successfully");

        return gameRef.id;
      }
    ),
    [user, handleApiErrors]
  );

  const getGameByGameId = useCallback(
    handleApiErrors(async (gameId: string): Promise<Game> => {
      console.log("Fetching game with ID:", gameId);
      const gameDoc = await getDoc(doc(db, "games", gameId));

      if (!gameDoc.exists()) {
        console.error("Game not found");
        throw new Error("Game not found");
      }

      const gameData = {...gameDoc.data(), id: gameId} as Game;
      console.log("Game data fetched:", gameData);

      return gameData;
    }),
    [handleApiErrors]
  );

  const updateGame = useCallback(
    handleApiErrors(async (data: any, gameId: string): Promise<void | Game> => {
      console.log("UpdateGame - Finding game with ID:", gameId);
      const gameRef = doc(db, "games", gameId)

      await updateDoc(gameRef, { ...data }).then(async () => {
        const newGame = await getDoc(doc(db, "games", gameId));
        if (newGame) console.log("Updated count: ", newGame.data()!.playerCount);
        return {...newGame.data(), id: gameId} as Game;
      });
    }),
    [handleApiErrors]
  );

  const deleteGame = useCallback(
    handleApiErrors(async (gameId: string): Promise<void> => {
      console.log("Deleting game with ID:", gameId);
      const gameRef = doc(db, "games", gameId);

      await setDoc(gameRef, {}, { merge: true });
      console.log("Game deleted successfully");
    }),
    [handleApiErrors]
  );

  return {
    listenToGame,
    createGame,
    getGameByGameId,
    deleteGame,
    updateGame,
  };
};

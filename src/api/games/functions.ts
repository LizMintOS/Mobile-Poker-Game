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
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/cards";
import { useCallback } from "react";
import { Player } from "../players/types";
import { LocalError } from "../errors/types";

export const listenToGame = (
  gameId: string,
  callback: (game: Game | null) => void
) => {
  const gameDocRef = doc(db, "games", gameId);

  const unsubscribe = onSnapshot(gameDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const gameData = { id: gameId, ...docSnapshot.data() };
      // const gameData = docSnapshot.data();
      console.log("Listener FN: ", gameData.id)
      callback(gameData as Game);
    } else {
      console.log("No such game document!");
      callback(null);
    }
  });

  return unsubscribe;
};

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const createGame = useCallback(
    handleApiErrors(async (deck: Card[], hand: Card[]): Promise<Game> => {
      let gameData = {
        creatorId: user!.uid,
        hasStarted: false,
        playerCount: 1,
        deck: deck,
        turn: 0,
        state: "lobby",
      };
      const gameRef = await addDoc(collection(db, "games"), {
        ...gameData,
      });

      console.log("Game created with ID:", gameRef.id);

      const playerData: Player = {
        hand: hand,
        isTurn: true,
      };

      console.log("Adding player data:", playerData as Player);

      await setDoc(doc(db, "games", gameRef.id, "players", user!.uid), {
        playerData,
      });

      console.log("Player data added successfully");
      const newGame = { id: gameRef.id, ...gameData } as Game;
      console.log(newGame.id);
      return newGame;
    }),
    [user, handleApiErrors]
  );

  const getGameByGameId = useCallback(
    handleApiErrors(async (gameId: string): Promise<Game> => {
      console.log("Fetching game with ID:", gameId);
      const gameDoc = await getDoc(doc(db, "games", gameId));

      if (!gameDoc.exists()) {
        throw { code: "no-game" } as LocalError;
      }

      const gameData = { ...gameDoc.data(), id: gameId } as Game;
      console.log("Game data fetched:", gameData);

      return gameData;
    }),
    [handleApiErrors]
  );

  const updateGame = useCallback(
    handleApiErrors(async (data: any, gameId: string): Promise<null | Game> => {
      console.log("UpdateGame - Finding game with ID:", gameId);
      const gameRef = doc(db, "games", gameId);

      const updatedGame = await updateDoc(gameRef, { ...data }).then(
        async () => {
          const newGame = await getDoc(doc(db, "games", gameId)).then((d) =>
            d.data()
          );
          if (newGame != undefined) {
            console.log("Updated count: ", newGame.playerCount);
            return { ...newGame, id: gameId } as Game;
          } else {
            return null;
          }
        }
      );

      return updatedGame;
    }),
    [handleApiErrors]
  );

  const deleteGame = useCallback(
    handleApiErrors(async (game: Game): Promise<void> => {
      console.log("Deleting game with ID:", game.id);
      const gameRef = doc(db, "games", game.id);

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

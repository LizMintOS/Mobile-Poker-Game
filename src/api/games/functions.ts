import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { db } from "../../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/shuffleCards";

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const createGame = handleApiErrors(
    async (deck: Card[], playerHand: Card[]): Promise<string> => {
      console.log("Creating game...");
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

      const playerData = {
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
  );

  const getGame = handleApiErrors(
    async (gameId: string): Promise<Game | null> => {
      console.log("Fetching game with ID:", gameId);
      const gameDoc = await getDoc(doc(db, "games", gameId));

      if (!gameDoc.exists()) {
        console.error("Game not found");
        throw new Error("Game not found");
      }

      const gameData = gameDoc.data() as Game;
      console.log("Game data fetched:", gameData);

      return gameData;
    }
  );

  const subscribeToGameUpdates = (
    gameId: string,
    callback: (game: Game) => void
  ) => {
    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const gameData = docSnapshot.data() as Game;
        callback(gameData);
      } else {
        console.error("Game not found for subscription");
        throw new Error("Game not found for subscription");
      }
    });

    return unsubscribe;
  };

  return {
    createGame,
    getGame,
    subscribeToGameUpdates,
  };
};

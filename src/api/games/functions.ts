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
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/shuffleCards";

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const createGame = handleApiErrors(
    async (deck: Card[], playerHand: Card[]): Promise<any> => {
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

      return gameRef;
    }
  );

  return {
    createGame,
  };
};

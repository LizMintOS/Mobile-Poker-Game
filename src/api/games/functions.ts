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

      const gamePlayersRef = await setDoc(
        doc(db, "games", gameRef.id, "players", user!.uid),
        { playerData }
      );

      console.log("Player data added successfully");

      return gameRef;
    }
  );

  // const getGames = handleApiErrors(
  //   async (setGames: React.Dispatch<React.SetStateAction<Game[]>>) => {
  //     const gamesSnapshot = await getDocs(collection(db, "games"));
  //     const games: Game[] = [];

  //     if (!gamesSnapshot.empty) {
  //       gamesSnapshot.forEach((doc) => {
  //         const gameData = doc.data() as Game;
  //         games.push({
  //           ...gameData,
  //         });
  //       });

  //       setGames(games);
  //     } else {
  //       setGames([]);
  //     }
  //   }
  // );

  return {
    createGame,
    // getGames,
  };
};

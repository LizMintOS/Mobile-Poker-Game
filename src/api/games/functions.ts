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

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const createGame = handleApiErrors(async () => {
    const gameRef = await addDoc(collection(db, "games"), {
      creatorId: user!.uid,
      hasStarted: false,
      playerCount: 1,
    } as Game);

    const playerData = {
      userId: user!.uid,
      cards: [],
    };

    await addDoc(collection(db, "games", gameRef.id, "players", user!.uid), playerData).then(() => {
      return {
        id: gameRef.id,
        creatorId: user!.uid,
        hasStarted: false,
        playerCount: 1,
        players: [playerData],
      } as Game;
    });
    // await addDoc(collection(db, "users", user!.uid), {
    //   game: gameRef.id,
    // });
  });

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

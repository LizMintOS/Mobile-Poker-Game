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
import { Game, CreateGameInput } from "./types";
import { User } from "firebase/auth";

export const useGameActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();

  const createGame = handleApiErrors(async (gameData: CreateGameInput) => {
    const gameRef = await addDoc(collection(db, "games"), {
      name: gameData.name,
      creatorId: user!.uid,
      hasStarted: false,
    });

    await addDoc(collection(db, "games", gameRef.id, "players", user!.uid), {});

    await addDoc(collection(db, "users", user!.uid), {
      game: gameRef.id,
    });
  });

  const getGames = handleApiErrors(
    async (setGames: React.Dispatch<React.SetStateAction<Game[]>>) => {
      const gamesSnapshot = await getDocs(collection(db, "games"));
      const games: Game[] = [];

      if (!gamesSnapshot.empty) {
        gamesSnapshot.forEach((doc) => {
          const gameData = doc.data() as Game;
          games.push({
            ...gameData,
          });
        });

        setGames(games);
      } else {
        setGames([]);
      }
    }
  );

  return {
    createGame, getGames
  };
};

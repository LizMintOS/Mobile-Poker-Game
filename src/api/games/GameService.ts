import { db } from "src/services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  onSnapshot,
  runTransaction,
  Transaction,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/cards";
import { LocalError } from "../errors/types";

export const GameService = {
  listenToGame(gameId: string, callback: (game: Game | null) => void) {
    const gameDocRef = doc(db, "games", gameId);
    return onSnapshot(gameDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback({ id: gameId, ...docSnapshot.data() } as Game);
      } else {
        callback(null);
      }
    });
  },

  async createGame(user: User, deck: Card[], hand: Card[]): Promise<Game> {
    const gameData = {
      creatorId: user.uid,
      hasStarted: false,
      playerCount: 1,
      deck,
      turn: 0,
      turnOrder: [user.uid],
      state: "lobby",
    };

    const gameRef = await addDoc(collection(db, "games"), gameData);

    await setDoc(doc(db, "games", gameRef.id, "players", user.uid), {
      hand: hand,
    });

    const newGame = { id: gameRef.id, ...gameData } as Game;

    return newGame;
  },

  async getGameByGameId(gameId: string): Promise<Game> {
    const gameDoc = await getDoc(doc(db, "games", gameId));

    if (!gameDoc.exists()) throw { code: "no-game" } as LocalError;

    return { id: gameId, ...gameDoc.data() } as Game;
  },

  async updateGame(gameId: string, data: any): Promise<Game | null> {
    const gameRef = doc(db, "games", gameId);

    await updateDoc(gameRef, data);

    const updatedGame = await getDoc(gameRef);

    const gameData = updatedGame.data();

    return gameData ? ({ id: gameId, ...gameData } as Game) : null;
  },

  async updateGameTransaction(gameId: string, data: any): Promise<void> {
    const gameRef = doc(db, "games", gameId);

    await runTransaction(db, async (transaction: Transaction) => {
      transaction.update(gameRef, data);
    });
  },

  async deleteGame(gameId: string): Promise<void> {
    const playerDocs = await getDocs(
      collection(db, "games", gameId, "players")
    );

    const deletePlayers = playerDocs.docs.map((docRef) =>
      deleteDoc(doc(db, "games", gameId, "players", docRef.id))
    );

    await Promise.all(deletePlayers);

    await deleteDoc(doc(db, "games", gameId));
  },
};

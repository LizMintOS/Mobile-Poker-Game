import { db } from "../../services/firebase";
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
  query,
  getDocs,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Game } from "./types";
import { Card } from "../../utils/cards";
// import { useCallback } from "react";

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
};

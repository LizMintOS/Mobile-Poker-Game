import { db } from "src/services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  runTransaction,
  Transaction,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { Player } from "./types";
import { Game } from "../games/types";

import { Card } from "../../utils/cards";

export const PlayerService = {
  async addPlayerToGame(
    game: Game,
    user: User,
    hand: Card[]
  ): Promise<void | string> {
    const path = `/games/${game.id}/players/${user.uid}`;

    const playerDoc = await getDoc(doc(db, path));
    if (!playerDoc.exists()) {
      const playerDocRef = doc(db, path);
      await setDoc(playerDocRef, {
        hand: hand,
      });

      return "success";
    } else {
      throw new Error("Already in game");
    }
  },
};

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
  async addPlayerToGame(game: Game, user: User, hand: Card[]): Promise<string> {
    const path = `/games/${game.id}/players/${user.uid}`;

    const playerDoc = await getDoc(doc(db, path));
    if (!playerDoc.exists()) {
      const playerDocRef = doc(db, path);
      await setDoc(playerDocRef, {
        hand: hand,
      });

      return "success";
    }
    return "Already in game";
  },

  async getPlayerData(
    playerId: string,
    gameId: string
  ): Promise<Player | string> {
    const playerDoc = await getDoc(
      doc(db, "games", gameId, "players", playerId)
    );
    if (!playerDoc.exists()) {
      return "Player not found";
    }

    const playerData = playerDoc.data();
    return { id: playerId, hand: playerData.playerData.hand } as Player;
  },

  async updatePlayerDataInTransaction(
    data: any,
    gameId: string,
    playerId: string
  ): Promise<void> {
    const playerRef = doc(db, "games", gameId, "players", playerId);
    await runTransaction(db, async (transaction: Transaction) => {
      transaction.update(playerRef, { ...data });
    });
  },

  async deletePlayerFromGame(playerId: string, gameId: string): Promise<void> {
    await deleteDoc(doc(db, "games", gameId, "players", playerId));
    // await updateGameTransaction(gameId, {
    //   playerCount: increment(-1),
    // }); //move to proxy
  },
};

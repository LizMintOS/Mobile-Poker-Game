import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { useGameActions } from "../games/functions";
import { db } from "../../services/firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  DocumentData,
  onSnapshot,
  setDoc,
  increment,
  getDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";

import { User } from "firebase/auth";
import { Player } from "./types";

import { useCallback } from "react";
import { Game } from "../games/types";
import {
  addCardsToDeck,
  addCardsToHand,
  removeCardsFromDeck,
} from "../../utils/cards";

export const listenToPlayer = (
  gameId: string,
  playerId: string,
  callback: (playerData: Player) => void
) => {
  const playerDocRef = doc(db, "games", gameId, "players", playerId);

  const unsubscribe = onSnapshot(playerDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const playerData = { id: playerId, ...docSnapshot.data() };
      console.log("Player Listener FN: ", playerData.id);
      callback(playerData as Player);
    } else {
      console.log("No such player document!");
      callback({id: "", hand: []});
    }
  });

  return unsubscribe;
};

export const usePlayerActions = (user: User | null) => {
  const { handleApiErrors } = useHandleApiFunction();
  const { updateGame } = useGameActions(user);

  const addPlayer = useCallback(
    handleApiErrors(async (game: Game): Promise<void | Game> => {
      const path = `/games/${game.id}/players/${user!.uid}`;
      const hand = addCardsToHand(game.deck, 5);
      console.log("Creating player for game: ", game.id);

      const playerDoc = await getDoc(doc(db, path));

      if (!playerDoc.exists()) {
        console.log("Creating new player...");
        const playerDocRef = doc(db, path);
        await setDoc(playerDocRef, {
          hand: hand,
        });

        console.log("Player created");

        const newGame: Game = (await updateGame(
          {
            playerCount: increment(1),
            deck: removeCardsFromDeck(hand),
            turnOrder: arrayUnion(user!.uid),
          },
          game.id
        )) as Game;

        return newGame;
      } else {
        console.log("Already in game");
        throw "Already in game";
      }
    }),
    [handleApiErrors, user]
  );

  const getPlayer = useCallback(
    handleApiErrors(
      async (playerId: string, gameId: string): Promise<Player> => {
        console.log("retrieving player...");

        const playerDoc = await getDoc(
          doc(db, "games", gameId, "players", playerId)
        );

        if (!playerDoc.exists()) {
          throw "Player not found";
        }

        const playerData = { id: playerId, ...playerDoc.data() } as Player;

        console.log("Game data fetched:", playerData);

        return playerData;
      }
    ),
    [handleApiErrors]
  );

  const deletePlayer = useCallback(
    handleApiErrors(async (playerId: string, game: Game): Promise<void> => {
      console.log("Deleting player from game");

      const player = await getPlayer(playerId, game.id);

      await deleteDoc(doc(db, "games", game.id, "players", playerId));

      const newDeck = addCardsToDeck(player.hand, game.deck);

      await updateGame({ playerCount: increment(-1), deck: newDeck }, game.id);
    }),
    [handleApiErrors]
  );

  return {
    listenToPlayer,
    addPlayer,
    getPlayer,
    deletePlayer,
  };
};

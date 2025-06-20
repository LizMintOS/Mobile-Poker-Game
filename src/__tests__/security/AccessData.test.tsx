//@ts-ignore
window.setImmediate = window.setTimeout;
import { readFileSync } from "node:fs";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { db } from "src/services/firebase";
import * as firestore from "firebase/firestore";
import { Game } from "src/api/types";

const fs = firestore as jest.Mocked<typeof firestore>;

let testEnvironment: RulesTestEnvironment;

beforeAll(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: "poker-game-2025",
    firestore: {
      rules: readFileSync("firestore.rules", "utf-8"),
    },
    hub: {
      host: "localhost",
      port: 4400,
    },
  });
});

afterAll(async () => {
  await testEnvironment.cleanup();
});

test("Auth user can create game", async () => {
  const gameId = "game1";
  const creatorUid = "user123";

  const mockGame: Game = {
    id: gameId,
    creatorId: creatorUid,
    hasStarted: false,
    playerCount: 0,
    deck: [],
    turn: 0,
    turnOrder: [],
    scores: [],
  };
  const db = testEnvironment.authenticatedContext(creatorUid).firestore();

  await assertSucceeds(
    fs.setDoc(fs.doc(db, `games/${gameId}/`), mockGame)
  );
});

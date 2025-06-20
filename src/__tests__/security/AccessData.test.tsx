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

describe("Firestore security rules", () => {
  const gameId = "game1";
  const creatorUid = "user123";
  const otherUid = "otherUser";
  const playerId = "player123";

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

  function getDbForUser(uid: string) {
    return testEnvironment.authenticatedContext(uid).firestore();
  }

  function getDbUnauthenticated() {
    return testEnvironment.unauthenticatedContext().firestore();
  }

  test("Auth user can create game", async () => {
    const db = getDbForUser(creatorUid);

    await assertSucceeds(fs.setDoc(fs.doc(db, `games/${gameId}/`), mockGame));
  });

  test("Auth user can read a game", async () => {
    const db = getDbForUser(otherUid);
    await assertSucceeds(fs.getDoc(fs.doc(db, `games/${gameId}`)));
  });
});

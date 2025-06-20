//@ts-ignore
window.setImmediate = window.setTimeout;
import { readFileSync } from "node:fs";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { Game, Player } from "src/api/types";

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

const gameId = "game1";
const creatorUid = "creatorUser";
const playerUid = "playerUser";
const otherUid = "otherUser";

function getDbForUser(uid: string) {
  return testEnvironment.authenticatedContext(uid).firestore();
}

function getDbUnauthenticated() {
  return testEnvironment.unauthenticatedContext().firestore();
}

describe("Firestore security rules - players", () => {
  test("Authenticated user can read their own player doc", async () => {
    const db = getDbForUser(playerUid);
    const playerRef = doc(db, `games/${gameId}/players/${playerUid}`);
    await setDoc(playerRef, { gameCreatorId: creatorUid });

    await assertSucceeds(getDoc(playerRef));
  });

  test("Authenticated user cannot read another player's doc", async () => {
    const db = getDbForUser(otherUid);
    const playerRef = doc(db, `games/${gameId}/players/${playerUid}`);
    await assertFails(getDoc(playerRef));
  });
});

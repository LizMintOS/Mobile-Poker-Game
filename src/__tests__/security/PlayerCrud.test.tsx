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

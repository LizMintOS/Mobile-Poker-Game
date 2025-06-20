//@ts-ignore
window.setImmediate = window.setTimeout;
import { readFileSync } from "node:fs";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


import { Game } from "src/api/types";

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

    await assertSucceeds(setDoc(doc(db, `games/${gameId}/`), mockGame));
  });

  test("Auth user can read a game", async () => {
    const db = getDbForUser(otherUid);
    await assertSucceeds(getDoc(doc(db, `games/${gameId}`)));
  });

  test("Unauthenticated user cannot read game", async () => {
    const db = getDbUnauthenticated();
    console.log("Unauthenticated Firestore DB:", db); 
    await assertFails(getDoc(doc(db, `games/${gameId}`)));
  });

  test("Game creator can update game", async () => {
    const db = getDbForUser(creatorUid);
    await assertSucceeds(
      updateDoc(doc(db, `games/${gameId}`), { hasStarted: true })
    );
  });

  test("Non-creator can update game", async () => {
    const db = getDbForUser(otherUid);

    await setDoc(doc(db, `games/${gameId}/players/${otherUid}`), {
      id: otherUid,
      hand: ["5D"],
    });

    await assertSucceeds(
      updateDoc(doc(db, `games/${gameId}`), { deck: ["2H", "KS"] })
    );
  });
  
  test("Non-creator can update game", async () => {
    const db = getDbForUser(otherUid);

    await setDoc(doc(db, `games/${gameId}/players/${otherUid}`), {
      id: otherUid,
      hand: ["5D"],
    });

    await assertSucceeds(
      updateDoc(doc(db, `games/${gameId}`), { deck: ["2H", "KS"] })
    );
  });


});

import { initializeApp } from "firebase/app";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP2yjcvFxkIcI-Pns55KLyZO_8MVESSv0",
  authDomain: "poker-game-2025.firebaseapp.com",
  projectId: "poker-game-2025",
  storageBucket: "poker-game-2025.firebasestorage.app",
  messagingSenderId: "74684296066",
  appId: "1:74684296066:web:64d4dcb1549a702ad2fd9b",
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager({}),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});
export const auth = getAuth(app);

// if (process.env.REACT_USE_EMULATORS === "True") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
// }

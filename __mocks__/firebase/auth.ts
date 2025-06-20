import { auth } from "src/services/firebase";

export const getAuth = jest.fn(() => auth);

export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const signOut = jest.fn();
export const signInAnonymously = jest.fn();
export const onAuthStateChanged = jest.fn();
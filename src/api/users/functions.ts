import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../../services/firebase";

export const registerUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};

export const loginAnonymously = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Error logging in anonymously:", error);
  }
};

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};

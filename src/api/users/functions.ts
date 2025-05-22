import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { mapErrorToConstantErrorMessage } from "../errors/functions";
import { useError } from "../../contexts/ErrorProvider";

export const useAuthActions = () => {
  const { setError, clearError } = useError();

  const handleError = (error?: any) => {
    if (!error) {
      clearError();
      return;
    }
    const mappedError = mapErrorToConstantErrorMessage(error);
    setError(mappedError);
  };

  const registerUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error logging in user:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Error logging out user:", error);
    }
  };

  const loginAnonymouslyUser = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error: any) {
      console.error("Error logging in anonymously:", error);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    loginAnonymouslyUser,
  };
};

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};

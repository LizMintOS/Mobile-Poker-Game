import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useHandleApiFunction } from "../hooks/useHandleApiFunction";

export const useAuthActions = () => {
  const { handleApiErrors } = useHandleApiFunction();

  const registerUser = handleApiErrors(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  );

  const loginUser = handleApiErrors(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  });

  const logoutUser = handleApiErrors(async () => {
    await signOut(auth);
  });

  const loginAnonymouslyUser = handleApiErrors(async () => {
    await signInAnonymously(auth);
  });

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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { mapErrorToConstantErrorMessage } from "../errors/functions";
import { useError } from "../../contexts/ErrorProvider";

export const useAuthActions = () => {
  const { setError, clearError } = useError();

  const handleApiErrors = <T extends (...args: any[]) => any>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      clearError();
      try {
        return await fn(...args);
      } catch (error: any) {
        const mappedError = mapErrorToConstantErrorMessage(error);
        setError(mappedError);
      }
    };
  };

  const registerUser = handleApiErrors(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      updateProfile(user!, {
        displayName: email.substring(0, email.indexOf("@")),
      });
      if (user) console.log("User registered successfully:", user);
    }
  );

  const loginUser = handleApiErrors(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  });

  const logoutUser = handleApiErrors(async () => {
    await signOut(auth);
  });

  const loginAnonymouslyUser = handleApiErrors(async () => {
    const user = await signInAnonymously(auth);
    if (user) console.log("User snuck in successfully:", user);
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

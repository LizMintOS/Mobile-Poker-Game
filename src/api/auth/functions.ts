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
import { useState } from "react";

export const useAuthActions = () => {
  const { setError, clearError } = useError();
  const [loading, setLoading] = useState(false);

  const handleApiErrors = <T extends (...args: any[]) => any>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      setLoading(true);
      clearError();
      try {
        return await fn(...args);
      } catch (error: any) {
        const mappedError = mapErrorToConstantErrorMessage(error);
        setError(mappedError);
      } finally {
        setLoading(false);
      }
    };
  };

  const registerUser = handleApiErrors(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          const user = auth.currentUser;
          await updateProfile(user!, {
            displayName: email.substring(0, email.indexOf("@")),
          });
        }
      );
    }
  );

  const loginUser = handleApiErrors(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  });

  const logoutUser = handleApiErrors(async () => {
    await signOut(auth);
  });

  const loginAnonymouslyUser = handleApiErrors(async () => {
    await signInAnonymously(auth).then(async () => {
      const user = auth.currentUser;
      await updateProfile(user!, {
        displayName: "Guest",
      });
      if (user) console.log("User snuck in successfully:", user.displayName);
    });
  });

  return {
    registerUser,
    loginUser,
    logoutUser,
    loginAnonymouslyUser,
    loading,
  };
};

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};

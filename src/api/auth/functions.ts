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
    async (email: string, password: string, onSuccess: (user: any) => void) => {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async () => {
          const user = auth.currentUser;
          await updateProfile(user!, {
            displayName: email.substring(0, email.indexOf("@")),
          }).then(() => {
            console.log("User profile created successfully", user?.displayName);
            if (onSuccess) onSuccess(user);
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
  };
};

export const subscribeToAuthChanges = (callback: (user: any) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};

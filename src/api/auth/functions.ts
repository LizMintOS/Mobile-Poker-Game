import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useHandleApiFunction } from "../hooks/useHandleApiFunction";

export const useAuthActions = () => {
  const { handleApiErrors, loading } = useHandleApiFunction();

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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../../services/firebase";
// import { useHandleApiFunction } from "../hooks/useHandleApiFunction";

export const AuthService = {
  register: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),

  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  loginAnonymously: () => signInAnonymously(auth),

  onAuthChange: (callback: (user: any) => void) => {
    return auth.onAuthStateChanged(callback);
  },
};
//   const { handleApiErrors } = useHandleApiFunction();

//   const registerUser = handleApiErrors(
//     async (email: string, password: string) => {
//       await createUserWithEmailAndPassword(auth, email, password);
//     }
//   );

//   const loginUser = handleApiErrors(async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   });

//   const logoutUser = handleApiErrors(async () => {
//     await signOut(auth);
//   });

//   const loginAnonymouslyUser = handleApiErrors(async () => {
//     await signInAnonymously(auth);
//   });

//   return {
//     registerUser,
//     loginUser,
//     logoutUser,
//     loginAnonymouslyUser,
//   };
// };

// export const subscribeToAuthChanges = (callback: (user: any) => void) => {
//   const unsubscribe = auth.onAuthStateChanged((user) => {
//     callback(user);
//   });
//   return unsubscribe;
// };

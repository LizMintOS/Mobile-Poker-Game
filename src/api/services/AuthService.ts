import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  getAuth,
} from "firebase/auth";

const auth = getAuth();

export const AuthService = {
  register: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),

  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  loginAnonymously: () => signInAnonymously(auth),

  onAuthChange: (callback: (user: any) => void) => {
    return auth.onAuthStateChanged((user) => {
      callback(user);
    });
  },
};

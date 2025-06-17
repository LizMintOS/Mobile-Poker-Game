import { AuthService } from "src/api/auth/AuthService";
process.env.REACT_USE_EMULATORS = "true";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInAnonymously,
  } from "firebase/auth";
  
  jest.mock("firebase/auth");

  
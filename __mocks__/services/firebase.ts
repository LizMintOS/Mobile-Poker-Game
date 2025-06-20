export const db = {};

export const auth = {
  currentUser: null,
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  signInAnonymously: jest.fn(),
  onAuthStateChanged: jest.fn(),
};


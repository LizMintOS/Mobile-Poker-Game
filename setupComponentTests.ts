// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Add TextEncoder and TextDecoder to global scope for compatibility
Object.assign(global, {
  TextDecoder,
  TextEncoder,
});

// Mocks for Firebase services used in component context
// jest.mock("src/services/firebase");
// jest.mock("firebase/firestore");
// jest.mock("firebase/auth");

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

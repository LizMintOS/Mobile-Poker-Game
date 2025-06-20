import { TextEncoder, TextDecoder } from "util";
import "cross-fetch/polyfill"; 
import { ReadableStream, WritableStream, TransformStream } from "web-streams-polyfill";

// Polyfill the streams needed by Firebase SDK:
Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  WritableStream,
  TransformStream,
});

// Mocks for Firebase services if needed in API tests
jest.mock("src/services/firebase");
jest.mock("firebase/firestore");
jest.mock("firebase/auth");

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

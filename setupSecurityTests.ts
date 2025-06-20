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

jest.unmock("firebase/firestore");
jest.unmock("src/services/firebase");
jest.unmock("firebase/app");

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

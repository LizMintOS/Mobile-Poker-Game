import { TextEncoder, TextDecoder } from "util";
import fetch, { Headers, Request, Response } from "node-fetch";
import { ReadableStream, ReadableStreamDefaultReader } from "web-streams-polyfill";

// Assign globals needed for API tests
Object.assign(global, {
  TextDecoder,
  TextEncoder,
  fetch,
  Headers,
  Request,
  Response,
  ReadableStream,
  ReadableStreamDefaultReader,
});

// Mocks for Firebase services if needed in API tests
jest.mock("src/services/firebase");
jest.mock("firebase/firestore");
jest.mock("firebase/auth");

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

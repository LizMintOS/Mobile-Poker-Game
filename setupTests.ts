// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { ReadableStream, ReadableStreamDefaultReader } from "web-streams-polyfill";

(global as any).ReadableStream = ReadableStream;
(global as any).ReadableStreamDefaultReader = ReadableStreamDefaultReader;
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import fetch, { Headers, Request, Response } from "node-fetch";
Object.assign(global, {
  TextDecoder,
  fetch,
  Headers,
  Request,
  Response,
  TextEncoder,
});


// global mocks
jest.mock("src/services/firebase");
jest.mock("firebase/firestore");
jest.mock("firebase/auth");

// clear all mocks before each test suite
beforeEach(() => {
  jest.clearAllMocks();
});

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
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

// This sets up a global automatic mock for the firebase service (auth, db)
jest.mock("src/services/firebase");

// clear all mocks before each test suite
beforeEach(() => {
  jest.clearAllMocks();
});

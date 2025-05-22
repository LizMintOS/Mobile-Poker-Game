import { FirestoreError } from "firebase/firestore";
import { AuthError } from "firebase/auth";
import { ErrorMessage, LocalError } from "./types";

export const mapFirestoreErrorToAuthError = (
    error: FirestoreError | AuthError | any
  ): LocalError => {
    switch (error.code) {
      case "not-found":
        return ErrorMessage.RESOURCE_NOT_FOUND
      case "auth/email-already-in-use":
        return {
          message: ErrorMessage.EMAIL_EXISTS,
          code: "EMAIL_EXISTS",
        };
      case "auth/user-not-found":
        return {
          message: ErrorMessage.USER_NOT_FOUND,
          code: "USER_NOT_FOUND",
        };
      case "auth/user-not-logged-in":
        return {
          message: ErrorMessage.USER_NOT_LOGGED_IN,
          code: "USER_NOT_LOGGED_IN",
        };
      case "auth/invalid-credential":
        return {
          message: ErrorMessage.INVALID_CREDENTIALS,
          code: "INVALID_CREDENTIALS",
        };
      case "auth/invalid-email":
        return {
          message: ErrorMessage.INVALID_EMAIL,
          code: "INVALID_EMAIL",
        };
      case "auth/invalid-password":
        return {
          message: ErrorMessage.INVALID_PASSWORD,
          code: "INVALID_PASSWORD",
        };
      case "auth/invalid-user-token":
        return {
          message: ErrorMessage.INVALID_DETAILS,
          code: "INVALID_DETAILS",
        };
      case "auth/network-request-failed":
        return {
          message: ErrorMessage.NETWORK_ERROR,
          code: "NETWORK_ERROR",
        };
      case "invalid-argument":
        return {
          message: ErrorMessage.INVALID_DETAILS,
          code: "INVALID_DETAILS",
        };
      case "already-exists":
        return {
          message: ErrorMessage.RESOURCE_EXISTS,
          code: "RESOURCE_EXISTS",
        };
      case "unauthenticated":
        return {
          message: ErrorMessage.RESOURCE_UNAUTH,
          code: "RESOURCE_UNAUTH",
        };
      case "permission-denied":
        return {
          message: ErrorMessage.ACCESS_DENIED,
          code: "ACCESS_DENIED",
        };
      case "aborted":
        return {
          message: ErrorMessage.FIREBASE_ERROR,
          code: "FIREBASE_ERROR",
        };
      case "internal":
        return {
          message: ErrorMessage.API_ERROR,
          code: "API_ERROR",
        };
      case "unimplemented":
        return {
          message: ErrorMessage.MISSING_FUNCTION,
          code: "MISSING_FUNCTION",
        };
      default:
        return {
          message: ErrorMessage.UNKNOWN_ERROR,
          code: error.code,
        };
    }
  };
  
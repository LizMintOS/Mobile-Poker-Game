import { FirestoreError } from "firebase/firestore";
import { AuthError } from "firebase/auth";
import { Errors, LocalError } from "./types";

export const mapErrorToConstantErrorMessage = (
  error: FirestoreError | AuthError | any,
  returnFullError: boolean = false
): string | LocalError => {
  const message = (() => {
    switch (error.code) {
      case "not-found":
        return Errors.RESOURCE_NOT_FOUND;
      case "auth/missing-email":
        return Errors.MISSING_EMAIL;
      case "auth/email-already-in-use":
        return Errors.EMAIL_EXISTS;
      case "auth/user-not-found":
        return Errors.USER_NOT_FOUND;
      case "auth/user-not-logged-in":
        return Errors.USER_NOT_LOGGED_IN;
      case "auth/invalid-credential":
        return Errors.INVALID_CREDENTIALS;
      case "auth/invalid-email":
        return Errors.INVALID_EMAIL;
      case "auth/invalid-password":
        return Errors.INVALID_PASSWORD;
      case "auth/invalid-user-token":
        return Errors.INVALID_DETAILS;
      case "auth/network-request-failed":
        return Errors.NETWORK_ERROR;
      case "invalid-argument":
        return Errors.INVALID_DETAILS;
      case "already-exists":
        return Errors.RESOURCE_EXISTS;
      case "unauthenticated":
        return Errors.RESOURCE_UNAUTH;
      case "permission-denied":
        return Errors.ACCESS_DENIED;
      case "aborted":
        return Errors.FIREBASE_ERROR;
      case "internal":
        return Errors.API_ERROR;
      case "unimplemented":
        return Errors.MISSING_FUNCTION;
      case "ingame":
        return Errors.INGAME_ERROR;
      case "no-game":
        return Errors.NOT_FOUND_ERROR;
      default:
        return Errors.UNKNOWN_ERROR;
    }
  })();

  if (returnFullError) {
    return { message, code: error.code || "UNKNOWN_ERROR" };
  }

  return message;
};

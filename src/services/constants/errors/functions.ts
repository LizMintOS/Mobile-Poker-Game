import { FirestoreError } from "firebase/firestore";
import { AuthError } from "firebase/auth";
import { Errors } from "./types";

export const mapFirestoreErrorToAuthError = (
  error: FirestoreError | AuthError | any
): string => {
  switch (error.code) {
    case "not-found":
      return Errors.RESOURCE_NOT_FOUND;
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
    default:
      return Errors.UNKNOWN_ERROR;
  }
};

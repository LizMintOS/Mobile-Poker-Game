export const FirebaseErrors = {
  FIREBASE_ERROR: "An error occurred with Firebase.",
  NO_USER: "No user is logged in. Please sign in",
  USER_NOT_FOUND: "User not found.",
  EMAIL_EXISTS: "Email already in use.",
  INVALID_EMAIL: "Invalid email address.",
  MISSING_EMAIL: "Email is required.",
  INVALID_PASSWORD: "Invalid password provided.",
} as const;

export const ApiErrors = {
  API_ERROR: "An error occurred with the API.",
  MISSING_FUNCTION: "Missing function in the API.",
  GET_ERROR: "Unable to retrieve item.",
  ADD_ERROR: "Unable to create item.",
  EDIT_ERROR: "Unable to edit item.",
  DELETE_ERROR: "Unable to delete item.",
  SUBSCRIBE_ERROR: "Unable to observe item.",
} as const;

export const AuthErrors = {
  RESOURCE_EXISTS: "Resource already exists.",
  RESOURCE_NOT_FOUND: "Resource not found.",
  RESOURCE_UNAUTH: "Resource is not authorized.",
  USER_NOT_LOGGED_IN: "User is not logged in.",
  ACCESS_DENIED: "You do not have permission to access this resource.",
} as const;

export const GeneralErrors = {
  NETWORK_ERROR: "Network error. Please try again.",
  UNKNOWN_ERROR: "An unknown error occurred.",
  INVALID_DETAILS: "Invalid details provided.",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
} as const;

export const GameErrors = {
  INGAME_ERROR: "You're already in this game.",
  NOT_FOUND_ERROR: "Game does not exist.",
}

export const Errors = {
  ...FirebaseErrors,
  ...ApiErrors,
  ...AuthErrors,
  ...GeneralErrors,
  ...GameErrors,
} as const;

export type ErrorCode = keyof typeof Errors;

export type LocalError = {
  message?: (typeof Errors)[ErrorCode];
  code: ErrorCode | string;
} | null;
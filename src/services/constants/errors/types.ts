export const ErrorMessage = {
  FIREBASE_ERROR: "An error occurred with Firebase.",
  API_ERROR: "An error occurred with the API.",
  MISSING_FUNCTION: "Missing function in the API.",
  GET_TODOS_ERROR: "Error getting todo documents.",
  ADD_TODO_ERROR: "Error adding a new todo.",
  EDIT_TODO_ERROR: "Error editing the todo.",
  DELETE_TODO_ERROR: "Error deleting the todo.",
  SUBSCRIBE_TODOS_ERROR: "Error subscribing to todos.",
  RESOURCE_EXISTS: "Resource already exists.",
  RESOURCE_NOT_FOUND: "Resource not found.",
  RESOURCE_UNAUTH: "Resource is not authorized.",
  NO_USER: "No user is logged in. Please sign in",
  USER_NOT_FOUND: "User not found.",
  INVALID_DETAILS: "Invalid details provided.",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD: "Invalid password provided.",
  EMAIL_EXISTS: "Email already in use.",
  USER_NOT_LOGGED_IN: "User is not logged in.",
  ACCESS_DENIED: "You do not have permission to access this resource.",
  NETWORK_ERROR: "Network error. Please try again.",
  UNKNOWN_ERROR: "An unknown error occurred.",
} as const;

export type ErrorCode = keyof typeof ErrorMessage;

export type LocalError = {
  message?: (typeof ErrorMessage)[ErrorCode];
  code: ErrorCode | string;
} | null;
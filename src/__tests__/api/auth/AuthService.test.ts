import { AuthService } from "src/api/auth/AuthService";
process.env.REACT_USE_EMULATORS = "true";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "src/services/firebase";

jest.mock("firebase/auth");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should successfully register a user", async () => {
      const mockUserCredential = { user: { uid: "12345" } };
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      const response = await AuthService.register(
        "test@example.com",
        "password123"
      );

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(response.user.uid).toBe("12345");
    });
  });
});

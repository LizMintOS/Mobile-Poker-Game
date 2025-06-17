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

    it("should fail if registration fails", async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error("Registration failed")
      );

      await expect(
        AuthService.register("test@example.com", "password123")
      ).rejects.toThrow("Registration failed");

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
    });
  });

  describe("login", () => {
    it("should successfully log in a user", async () => {
      const mockUserCredential = { user: { uid: "12345" } };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      const response = await AuthService.login(
        "test@example.com",
        "password123"
      );

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "password123"
      );
      expect(response.user.uid).toBe("12345");
    });

    it("should fail if login fails", async () => {
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error("Login failed")
      );

      await expect(
        AuthService.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Login failed");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        "test@example.com",
        "wrongpassword"
      );
    });
  });

  describe("logout", () => {
    it("should successfully log out", async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await AuthService.logout();

      expect(signOut).toHaveBeenCalledWith(auth);
    });

    it("should fail if logout fails", async () => {
      (signOut as jest.Mock).mockRejectedValue(new Error("Logout failed"));

      await expect(AuthService.logout()).rejects.toThrow("Logout failed");

      expect(signOut).toHaveBeenCalledWith(auth);
    });
  });

  describe("loginAnonymously", () => {
    it("should successfully log in anonymously", async () => {
      const mockUserCredential = { user: { uid: "anon123" } };
      (signInAnonymously as jest.Mock).mockResolvedValue(mockUserCredential);

      const response = await AuthService.loginAnonymously();

      expect(signInAnonymously).toHaveBeenCalledWith(auth);
      expect(response.user.uid).toBe("anon123");
    });
  });
});

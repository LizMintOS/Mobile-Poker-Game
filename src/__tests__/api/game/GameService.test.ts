import { GameService } from "src/api/services/GameService";
process.env.REACT_USE_EMULATORS = "true";
import { db } from "src/services/firebase";
import * as firestore from "firebase/firestore";

jest.mock("firebase/firestore");

describe("GameService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listenToGame", () => {
    it("should call onSnapshot and callback with game data", () => {
      const mockGameId = "game123";
      const mockCallback = jest.fn();

      const fakeDocRef = {};
      (firestore.doc as jest.Mock).mockReturnValue(fakeDocRef);

      const fakeSnapshot = {
        exists: () => true,
        data: () => ({ some: "data" }),
      };

      (firestore.onSnapshot as jest.Mock).mockImplementation((_ref, cb) => {
        cb(fakeSnapshot);
        return jest.fn();
      });

      GameService.listenToGame(mockGameId, mockCallback);

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", mockGameId);
      expect(firestore.onSnapshot).toHaveBeenCalledWith(
        fakeDocRef,
        expect.any(Function)
      );

      expect(mockCallback).toHaveBeenCalledWith({
        id: mockGameId,
        some: "data",
      });
    });

    it("should callback null if no game document", () => {
      const mockGameId = "game123";
      const mockCallback = jest.fn();

      (firestore.doc as jest.Mock).mockReturnValue({});
      (firestore.onSnapshot as jest.Mock).mockImplementation((_ref, cb) => {
        cb({ exists: () => false });
        return jest.fn();
      });

      GameService.listenToGame(mockGameId, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null);
    });
  });

  describe("createGame", () => {
    const mockDocRef = {};
    const mockCollectionRef = {};

    it("should create a game and set player data", async () => {
      const user = { uid: "user1" };
      const deck = ["card1", "card2"];
      const hand = ["card1"];

      (firestore.addDoc as jest.Mock).mockResolvedValue({ id: "game1" });
      (firestore.collection as jest.Mock).mockReturnValue(mockCollectionRef);
      (firestore.doc as jest.Mock).mockReturnValue(mockDocRef);
      (firestore.setDoc as jest.Mock).mockResolvedValue(undefined);

      const result = await GameService.createGame(
        user as any,
        deck as any,
        hand as any
      );

      expect(firestore.addDoc).toHaveBeenCalled();
      expect(firestore.setDoc).toHaveBeenCalled();
      expect(result.creatorId).toBe(user.uid);
    });

    it("should throw an error if create game fails", async () => {
      const user = { uid: "user1" };
      const deck = ["card1", "card2"];
      const hand = ["card1"];

      (firestore.addDoc as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to create game")
      );

      await expect(
        GameService.createGame(user as any, deck as any, hand as any)
      ).rejects.toThrow("Failed to create game");
    });
  });

  describe("getGameByGameId", () => {
    const gameData = {
      creatorId: "user123",
      hasStarted: false,
      playerCount: 2,
      deck: [],
      turn: 1,
      turnOrder: ["user123", "user456"],
    };
    const gameId = "game123";

    it("should return game data if document exists", async () => {
      (firestore.getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => gameData,
      });

      const game = await GameService.getGameByGameId(gameId);

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.getDoc).toHaveBeenCalledTimes(1);
      expect(game).toEqual({ id: gameId, ...gameData });
    });

    it("should throw error if document does not exist", async () => {
      const gameId = "invalidID";

      (firestore.getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      await expect(GameService.getGameByGameId(gameId)).rejects.toEqual(
        "Game not found"
      );

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.getDoc).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateGame", () => {
    const mockDocRef = {};

    beforeEach(() => {
      jest.clearAllMocks();
      (firestore.doc as jest.Mock).mockReturnValue(mockDocRef);
    });

    it("should update and return updated game", async () => {
      const gameId = "game123";
      const data = { hasStarted: true };

      (firestore.updateDoc as jest.Mock).mockResolvedValue(undefined);
      (firestore.getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => data,
      });

      const updatedGame = await GameService.updateGame(gameId, data);

      expect(firestore.updateDoc).toHaveBeenCalled();
      expect(firestore.updateDoc).toHaveBeenCalledWith(mockDocRef, data);
      expect(updatedGame).toEqual({ id: gameId, hasStarted: true });
    });

    it("should return null if getDoc returns no data", async () => {
      (firestore.updateDoc as jest.Mock).mockResolvedValue(undefined);
      (firestore.getDoc as jest.Mock).mockResolvedValue({
        data: () => undefined,
      });

      const updatedGame = await GameService.updateGame("game123", {});

      expect(updatedGame).toBeNull();
    });
  });

  describe("updateGameTransaction", () => {
    const mockDocRef = {};

    beforeEach(() => {
      jest.clearAllMocks();
      (firestore.doc as jest.Mock).mockReturnValue(mockDocRef);
    });

    it("should call runTransaction with update", async () => {
      const gameId = "game123";
      const data = { hasStarted: true };

      (firestore.runTransaction as jest.Mock).mockImplementation(
        async (_db, updateFn) => {
          await updateFn({
            update: jest.fn(),
          } as unknown as firestore.Transaction);
        }
      );

      await GameService.updateGameTransaction(gameId, data);

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.runTransaction).toHaveBeenCalled();
    });
  });

  describe("deleteGame", () => {
    it("should only delete the game doc (not players)", async () => {
      const gameId = "game123";
      const mockGameRef = {};

      (firestore.doc as jest.Mock).mockReturnValue(mockGameRef);
      (firestore.deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await GameService.deleteGame(gameId);

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(mockGameRef);
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if deleting the game fails", async () => {
      const gameId = "game123";
      const mockGameRef = {};

      (firestore.doc as jest.Mock).mockReturnValue(mockGameRef);

      const mockError = new Error("Failed to delete game");
      (firestore.deleteDoc as jest.Mock).mockRejectedValue(mockError);

      await expect(GameService.deleteGame(gameId)).rejects.toThrow(
        "Failed to delete game"
      );

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(mockGameRef);
    });
  });
});

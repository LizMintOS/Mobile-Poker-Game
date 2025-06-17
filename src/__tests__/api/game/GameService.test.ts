import { GameService } from "src/api/games/GameService";
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

      // Mock onSnapshot to immediately invoke callback
      (firestore.onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
        cb(fakeSnapshot);
        return jest.fn(); // unsubscribe function
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
      (firestore.onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
        cb({ exists: () => false });
        return jest.fn();
      });

      GameService.listenToGame(mockGameId, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null);
    });
  });

  describe("createGame", () => {
    it("should create a game and set player data", async () => {
      const user = { uid: "user1" };
      const deck = ["card1", "card2"];
      const hand = ["card1"];

      (firestore.addDoc as jest.Mock).mockResolvedValue({ id: "game1" });
      (firestore.collection as jest.Mock).mockReturnValue({});
      (firestore.doc as jest.Mock).mockReturnValue({});
      (firestore.setDoc as jest.Mock).mockResolvedValue(undefined);

      const result = await GameService.createGame(
        user as any,
        deck as any,
        hand as any
      );

      expect(firestore.addDoc).toHaveBeenCalled();
      expect(firestore.setDoc).toHaveBeenCalled();
      expect(result.id).toBe("game1");
      expect(result.creatorId).toBe(user.uid);
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
      state: "lobby",
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
      (firestore.getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false,
      });

      await expect(GameService.getGameByGameId(gameId)).rejects.toEqual({
        code: "no-game",
      });

      expect(firestore.doc).toHaveBeenCalledWith(db, "games", gameId);
      expect(firestore.getDoc).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateGame", () => {
    it("should update and return updated game", async () => {
      const gameId = "game123";
      const data = { hasStarted: true };

      (firestore.doc as jest.Mock).mockReturnValue({});
      (firestore.updateDoc as jest.Mock).mockResolvedValue(undefined);
      (firestore.getDoc as jest.Mock).mockResolvedValueOnce({
        data: () => data,
      });

      const updatedGame = await GameService.updateGame(gameId, data);

      expect(firestore.updateDoc).toHaveBeenCalled();
      expect(firestore.updateDoc).toHaveBeenCalledWith({}, data);
      expect(updatedGame).toEqual({ id: gameId, hasStarted: true });
    });

    it("should return null if getDoc returns no data", async () => {
      (firestore.doc as jest.Mock).mockReturnValue({});
      (firestore.updateDoc as jest.Mock).mockResolvedValue(undefined);
      (firestore.getDoc as jest.Mock).mockResolvedValue({
        data: () => undefined,
      });

      const updatedGame = await GameService.updateGame("game123", {});

      expect(updatedGame).toBeNull();
    });
  });

  describe("updateGameTransaction", () => {
    it("should call runTransaction with update", async () => {
      const gameId = "game123";
      const data = { state: "started" };

      (firestore.doc as jest.Mock).mockReturnValue({});

      (firestore.runTransaction as jest.Mock).mockImplementation(
        async (db, updateFn) => {
          await updateFn({
            update: jest.fn(),
          });
        }
      );

      await GameService.updateGameTransaction(gameId, data);

      expect(firestore.runTransaction).toHaveBeenCalled();
    });
  });

  describe("deleteGame", () => {
    it("should delete players and then the game", async () => {
      const game = { id: "game123" };
      const mockDocs = [{ id: "player1" }, { id: "player2" }];

      (firestore.collection as jest.Mock).mockReturnValue({});
      (firestore.getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });
      (firestore.doc as jest.Mock).mockReturnValue({});
      (firestore.deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await GameService.deleteGame(game as any);

      expect(firestore.getDocs).toHaveBeenCalled();
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(mockDocs.length + 1); // players + game
    });
  });
});

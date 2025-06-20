import { PlayerService } from "src/api/services/PlayerService";
import { db } from "src/services/firebase";
import * as firestore from "firebase/firestore";
import { Card } from "src/utils/cards";
import { Game } from "src/api/types";

const fs = firestore as jest.Mocked<typeof firestore>;

describe("PlayerService", () => {
  const mockGame: Game = {
    id: "gameId",
    creatorId: "user123",
    hasStarted: false,
    playerCount: 0,
    deck: [],
    turn: 0,
    turnOrder: [],
  };

  const mockPlayerId = "player456";
  const mockHand: Card[] = ["2H", "4D"];
  const mockDocRef: any = {};

  beforeEach(() => {
    jest.clearAllMocks();
    fs.doc.mockReturnValue(mockDocRef);
  });

  describe("addPlayerToGame", () => {
    it("adds a new player when not already in game", async () => {
      fs.getDoc.mockResolvedValue({ exists: () => false } as any);
      fs.setDoc.mockResolvedValue(undefined);

      const result = await PlayerService.addPlayerToGame(
        mockGame,
        mockPlayerId,
        mockHand
      );

      expect(fs.doc).toHaveBeenCalledWith(
        db,
        `/games/${mockGame.id}/players/${mockPlayerId}`
      );
      expect(fs.setDoc).toHaveBeenCalledWith(mockDocRef, { hand: mockHand });
      expect(result).toBe("success");
    });

    it("returns 'Already in game' when player doc exists", async () => {
      fs.getDoc.mockResolvedValue({ exists: () => true } as any);

      const result = await PlayerService.addPlayerToGame(
        mockGame,
        mockPlayerId,
        mockHand
      );

      expect(result).toBe("Already in game");
      expect(fs.setDoc).not.toHaveBeenCalled();
    });

    it("throws if getDoc fails", async () => {
      fs.getDoc.mockRejectedValue(new Error("Get failed"));

      await expect(
        PlayerService.addPlayerToGame(mockGame, mockPlayerId, mockHand)
      ).rejects.toThrow("Get failed");
    });
  });

  describe("getPlayerData", () => {
    it("returns player data if document exists", async () => {
      const mockHand = ["cardX", "cardY"];
      fs.getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({ hand: mockHand }),
      } as any);

      const result = await PlayerService.getPlayerData(
        mockPlayerId,
        mockGame.id
      );

      expect(fs.doc).toHaveBeenCalledWith(
        db,
        "games",
        mockGame.id,
        "players",
        mockPlayerId
      );
      expect(result).toEqual({ id: mockPlayerId, hand: mockHand });
    });

    it("returns 'Player not found' if document doesn't exist", async () => {
      fs.getDoc.mockResolvedValue({ exists: () => false } as any);

      const result = await PlayerService.getPlayerData(
        mockPlayerId,
        mockGame.id
      );

      expect(result).toBe("Player not found");
    });

    it("throws if getDoc fails", async () => {
      fs.getDoc.mockRejectedValue(new Error("Fetch error"));

      await expect(
        PlayerService.getPlayerData(mockPlayerId, mockGame.id)
      ).rejects.toThrow("Fetch error");
    });
  });

  describe("updatePlayerDataInTransaction", () => {
    it("runs transaction to update player", async () => {
      const updateFn = jest.fn();
      const mockTransaction = { update: updateFn };

      fs.runTransaction.mockImplementation(async (_db, callback) => {
        await callback(mockTransaction as any);
      });

      const data = { hand: ["cardUpdated"] };
      await PlayerService.updatePlayerDataInTransaction(
        data,
        mockGame.id,
        mockPlayerId
      );

      expect(fs.doc).toHaveBeenCalledWith(
        db,
        "games",
        mockGame.id,
        "players",
        mockPlayerId
      );
      expect(updateFn).toHaveBeenCalledWith(mockDocRef, data);
    });

    it("throws if transaction fails", async () => {
      fs.runTransaction.mockRejectedValue(new Error("Transaction failed"));

      await expect(
        PlayerService.updatePlayerDataInTransaction(
          { dhahsdas: "asdasdasd" },
          mockGame.id,
          mockPlayerId
        )
      ).rejects.toThrow("Transaction failed");
    });
  });

  describe("deletePlayerFromGame", () => {
    it("successfully deletes player document", async () => {
      fs.deleteDoc.mockResolvedValue(undefined);

      await PlayerService.deletePlayerFromGame(mockPlayerId, mockGame.id);

      expect(fs.doc).toHaveBeenCalledWith(
        db,
        "games",
        mockGame.id,
        "players",
        mockPlayerId
      );
      expect(fs.deleteDoc).toHaveBeenCalledWith(mockDocRef);
    });

    it("throws if delete fails", async () => {
      fs.deleteDoc.mockRejectedValue(new Error("Delete failed"));

      await expect(
        PlayerService.deletePlayerFromGame(mockPlayerId, mockGame.id)
      ).rejects.toThrow("Delete failed");
    });
  });
});

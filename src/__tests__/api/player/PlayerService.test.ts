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
  });
});

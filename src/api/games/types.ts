import { Card } from "../../utils/cards";

export type CreateGameInput = {
  name: string;
  creatorId: string;
};

export type Game = {
  id: string;
  creatorId: string;
  hasStarted: boolean;
  playerCount: number;
  deck: Card[];
  deckIndex: number;
  turn: number;
  state: "lobby" | "waiting" | "Your Turn" | "Game Over";
};


import { Card, HandName } from "../utils/cards";

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
  turn: number;
  turnOrder: string[];
  scores: PlayerScore[];
};

export type Player = {
  id: string;
  hand: Card[],
}

export type PlayerScore = {
  score: number;
  name: HandName
}
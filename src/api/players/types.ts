import { Card } from "../../utils/cards";

export type Player = {
  id: string;
  hand: Card[],
  isTurn: boolean,
}
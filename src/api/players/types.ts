import { Card } from "../../utils/cards";

export type Player = {
  hand: Card[],
  isTurn: boolean,
}
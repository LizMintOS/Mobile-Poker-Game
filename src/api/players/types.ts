import { Card } from "../../utils/shuffleCards";

export type Player = {
  hand: Card[],
  isTurn: boolean,
}
import { db } from "src/services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  runTransaction,
  Transaction,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { User } from "firebase/auth";

import { Player } from "./types";
import { Game } from "../games/types";

import { addCardsToHand, removeCardsFromDeck } from "../../utils/cards";
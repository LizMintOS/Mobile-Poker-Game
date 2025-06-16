import { GameService } from "../../../api/games/GameService";
import { db } from "../../../__mocks__/firebase";
import { getDoc } from "firebase/firestore";
import { render, screen, fireEvent } from "@testing-library/react";
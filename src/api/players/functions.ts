import { useHandleApiFunction } from "../hooks/useHandleApiFunction";
import { db } from "../../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";

import { User } from "firebase/auth";

import { useCallback } from "react";

export const usePlayerActions = (user: User | null) => {
    const { handleApiErrors } = useHandleApiFunction();

    const addPlayer = useCallback(
        handleApiErrors(
            async ()
        )
    )
}
import { createContext, useContext, useState } from "react";

type StatusType = "idle" | "loading" | "success" | "error";

interface StatusContextProps {
  status: StatusType;
  message?: string;
  setStatus: (status: StatusType, message?: string) => void;
  clearStatus: () => void;
}

const StatusContext = createContext<StatusContextProps | undefined>(undefined);

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatus must be used within a StatusProvider");
  }
  return context;
};

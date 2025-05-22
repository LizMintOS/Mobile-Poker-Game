import { createContext, ReactNode, useContext, useState } from "react";

type StatusType = "idle" | "loading" | "success" | "error";

interface StatusContextProps {
  status: StatusType;
  message?: string;
  error?: any;
  setStatus: (status: StatusType, message?: string, error?: string) => void;
  clearStatus: () => void;
}

const StatusContext = createContext<StatusContextProps>({
  status: "idle",
  setStatus: () => {},
  clearStatus: () => {},
});

export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatusValue] = useState<StatusType>("idle");
  const [message, setMessage] = useState<string | undefined>(undefined);

  const setStatus = (newStatus: StatusType, newMessage?: string) => {
    setStatusValue(newStatus);
    setMessage(newMessage);
  };

  const clearStatus = () => {
    setStatusValue("idle");
    setMessage(undefined);
  };

  return (
    <StatusContext.Provider value={{ status, message, setStatus, clearStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);

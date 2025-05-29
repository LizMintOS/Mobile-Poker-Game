import { useState, useContext, createContext, ReactNode } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within an LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <LoadingWrapper
        loading={loading}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        size={80}
      >
        <>{children}</>
      </LoadingWrapper>
    </LoadingContext.Provider>
  );
};

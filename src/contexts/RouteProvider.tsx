import { useState, useContext, createContext } from "react";

interface RouteContextType {
    currentRoute: string | null;
  setCurrentRoute: (error: any) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRoute = (): RouteContextType => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useNav must be used within an NavProvider");
  }
  return context;
};

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

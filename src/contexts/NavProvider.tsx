import { createContext, useContext } from "react";
import { useNavigate } from "react-router";

interface NavigationContextType {
  goBack: () => void;
  goForward: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  goBack: () => {},
  goForward: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const goForward = (path: string) => navigate(path);
  const goBack = () => navigate(-1);

  return (
    <NavigationContext.Provider
      value={{ goBack, goForward }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

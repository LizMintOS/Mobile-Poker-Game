import { createContext, useContext, useState, useEffect } from "react";
import { subscribeToAuthChanges } from "../api/auth/functions";
import { User } from "firebase/auth";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsWaiting(false);
    });
    console.log("Auth Context: ", currentUser?.uid == undefined ? null : currentUser.uid);

    return () => unsubscribe();
  }, [subscribeToAuthChanges, currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <LoadingWrapper
        loading={isWaiting}
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
    </AuthContext.Provider>
  );
};

import { Navigate, Outlet, useParams } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useEffect, useState } from "react";
import { useNavigation } from "../contexts/NavProvider";

const ProtectedHome = () => {
  const { currentUser } = useAuth();
  const { userId, username } = useParams();
  const { goForward } = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking authentication...");
    const timer = setTimeout(() => {
      if (!currentUser) {
        console.log("Not authenticated. Redirecting to auth page.");
        setLoading(false);
        goForward("/auth");
      } else {
        console.log("Authenticated. Proceeding to protected layout route.");
        setLoading(false);
        goForward(
          `/${userId ?? currentUser.uid}/${
            username ?? currentUser.displayName
          }/home`
        );
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [currentUser]);

  return (
    <LoadingWrapper
      loading={loading}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
      size={80}
    >
      <Outlet />
    </LoadingWrapper>
  );
};

export default ProtectedHome;

import { Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useEffect } from "react";
import { useNavigation } from "../contexts/NavProvider";
import { useLoading } from "../contexts/LoadingProvider";

const ProtectedHome = () => {
  const { currentUser } = useAuth();
  const { goForward } = useNavigation();
  const { setLoading, loading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    console.log("Checking authentication...");
    const timer = setTimeout(() => {
      if (!currentUser) {
        console.log("Not authenticated. Redirecting to auth page.");
        setLoading(false);
        goForward("/auth");
      } else {
        console.log("Authenticated. Proceeding to protected layout route.");
        if (location.pathname === "/" || location.pathname === "/auth") {
          goForward(`/user/${currentUser.displayName ?? "Guest"}`);
        }
        setLoading(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [currentUser, location.pathname]);

  return (
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
      <Outlet />
    </LoadingWrapper>
  );
};

export default ProtectedHome;

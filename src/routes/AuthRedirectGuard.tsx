import { useEffect } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { Outlet, useNavigate, useLocation } from "react-router";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";
import { useLoading } from "../contexts/LoadingProvider";

const AuthRedirectGuard = () => {
  const { setLoading, loading } = useLoading();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (!currentUser) {
        navigate(ROUTES.AUTH);
        // setLoading(false);
      } else if (currentUser && pathname === ROUTES.AUTH) {
        navigate(ROUTES.HOME);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser, useNavigate]);

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

export default AuthRedirectGuard;

import { useState, useEffect } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { Outlet, useNavigate } from "react-router";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";

const AuthRedirectGuard = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        navigate(ROUTES.AUTH);
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

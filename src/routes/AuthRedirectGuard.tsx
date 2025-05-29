import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";

const AuthRedirectGuard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH, { replace: true });
    } else if (currentUser && pathname === ROUTES.AUTH) {
      navigate(ROUTES.INDEX, { replace: true });
    }
  }, [currentUser, useNavigate]);

  return <Outlet />;
};

export default AuthRedirectGuard;

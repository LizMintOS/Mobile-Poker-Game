import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";
import { Toast } from "../components/common/Toast";

const AuthRedirectGuard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("User:", currentUser?.uid)
    if (!currentUser) {
      navigate(ROUTES.AUTH, { replace: true });
    } else if (currentUser && pathname === ROUTES.AUTH) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [currentUser, navigate, pathname]);

  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
};

export default AuthRedirectGuard;

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
    if (!currentUser) {
      console.log("Navigating to auth page")
      navigate(ROUTES.AUTH, { replace: true });
    } else {
      console.log(currentUser.uid);
      if (pathname === ROUTES.AUTH) {
        console.log("Navigating to home: ", currentUser.uid)
        navigate(ROUTES.HOME, { replace: true });
      }
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

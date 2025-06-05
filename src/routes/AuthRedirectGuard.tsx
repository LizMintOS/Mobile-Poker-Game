import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";
import { Toast } from "../components/common/Toast";
import { useGame } from "../contexts/GameProvider";

const AuthRedirectGuard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { game } = useGame();

  useEffect(() => {
    if (!currentUser) {
      navigate(ROUTES.AUTH, { replace: true });
    } else if (currentUser && pathname === ROUTES.AUTH) {
      navigate(ROUTES.HOME, { replace: true });
    }
    if (game && currentUser) {
      if (!game.hasStarted) navigate(ROUTES.GAME_LOBBY(game.id));
      else navigate(ROUTES.GAME(game.id));
    }
  }, [currentUser, useNavigate, game]);

  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
};

export default AuthRedirectGuard;

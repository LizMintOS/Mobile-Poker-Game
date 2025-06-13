import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../contexts/AuthProvider";
import { Toast } from "../components/common/Toast";
import { useGame } from "../contexts/GameProvider";

const AuthRedirectGuard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const { game } = useGame();

  useEffect(() => {
    console.log("User:", currentUser?.uid == undefined ? null : currentUser.uid);
    // console.log("Game Redirect: ", game?.id ?? null)
    if (!currentUser) {
      navigate(ROUTES.AUTH, { replace: true });
    } else {
      // if (pathname === ROUTES.AUTH || !game) {
      if (pathname === ROUTES.AUTH) {
        navigate(ROUTES.HOME, { replace: true });
      }
      // if (game) {
      //   if (game.hasStarted && pathname === ROUTES.GAME_LOBBY(game.id)) {
      //     navigate(ROUTES.GAME(game.id), { replace: true });
      //   } else {
      //     navigate(ROUTES.GAME_LOBBY(game.id), { replace: true });
      //   }
      // }
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

import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useGame } from "../contexts/GameProvider";

const GameRedirectGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { game } = useGame();

  useEffect(() => {
    // console.log("Redirect: ", game?.id)
    if (!game) {
      navigate(ROUTES.HOME, { replace: true });
    } else if (game.hasStarted && pathname === ROUTES.GAME_LOBBY(game.id)) {
      navigate(ROUTES.GAME(game.id), { replace: true });
    } else {
      navigate(ROUTES.GAME_LOBBY(game.id), { replace: true });
    }
    console.log("Redirect: ", game?.id)
  }, [navigate, game, pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default GameRedirectGuard;

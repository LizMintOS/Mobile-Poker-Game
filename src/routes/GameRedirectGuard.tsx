import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useGame } from "../contexts/GameProvider";

const GameRedirectGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { game, gameId } = useGame();

  useEffect(() => {
    if (!game && !gameId) {
      navigate(ROUTES.HOME, { replace: true });
    } else {
      if (game && game.hasStarted && pathname === ROUTES.GAME_LOBBY(game.id)) {
        navigate(ROUTES.GAME(game.id), { replace: true });
      } else if (pathname === ROUTES.HOME && gameId) {
        navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
      }
    }
    console.log("Redirect: ", gameId ?? "No game");
  }, [navigate, game, gameId]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default GameRedirectGuard;

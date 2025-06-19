import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useGame } from "../contexts/GameProvider";

const GameRedirectGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { game, gameId } = useGame();

  useEffect(() => {
    console.log(
      "Redirect check — game:",
      game,
      "gameId:",
      gameId,
      "path:",
      pathname
    );

    if (!gameId) {
      navigate(ROUTES.HOME, { replace: true });
    } else if (gameId && !game) {
      navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
    } else if (game) {
      if (game.hasStarted && pathname === ROUTES.GAME_LOBBY(game.id))
        navigate(ROUTES.GAME(game.id), { replace: true });
    }
  }, [navigate, game, gameId, pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default GameRedirectGuard;

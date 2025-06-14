import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { useGame } from "../contexts/GameProvider";
// import { useAuth } from "../contexts/AuthProvider";

const GameRedirectGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { game, gameId } = useGame();
  // const { currentUser } = useAuth();

  useEffect(() => {
    // if (currentUser) {
    if (!game || !gameId) {
      navigate(ROUTES.HOME, { replace: true });
    } else {
      if (game.hasStarted && pathname === ROUTES.GAME_LOBBY(game.id)) {
        navigate(ROUTES.GAME(game.id), { replace: true });
      } else {
        navigate(ROUTES.GAME_LOBBY(game.id), { replace: true });
      }
    }
    console.log("Redirect: ", game?.id ?? "No game");
  }, [navigate, game]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default GameRedirectGuard;

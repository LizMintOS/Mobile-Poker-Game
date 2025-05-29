import GreenButton from "../components/common/buttons/GreenButton";
import Title from "../components/common/Title";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingProvider";

const GameLobby = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { loading, setLoading } = useLoading();
  const { getGame } = useGameActions(currentUser);
  const [numPlayers, setNumPlayers] = useState(1);

  const fetchGameData = async (gameId: string) => {
    setLoading(true);
    const game = await getGame(gameId);
    if (game) {
      setNumPlayers(game.playerCount);
      if (game.hasStarted) {
        navigate(ROUTES.GAME(gameId), { replace: true });
      }
    }

    setLoading(false);
  };

  const { gameId } = useParams<{ gameId: string }>();
  if (!gameId) {
    return <div className="text-red-500">Game ID is missing.</div>;
  }
  return (
    <>
      <div className="flex justify-center items-center align-center relative min-h-4/5">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-fit text-center border-1 border-slate-100/50">
          <Title title="Welcome to the Game Lobby!" />
          <div className="flex flex-col items-center justify-center space-y-4 mt-2">
            <p className="text-lg text-green-600 font-semibold italic">
              {gameId}
            </p>
            <p className="text-lg text-gray-700">
              Send this code to your friends to join the lobby
            </p>
            <p className="text-sm text-gray-500">
              Waiting for players to join...
            </p>
            <p className="text-sm text-gray-500">
              {numPlayers} player{numPlayers !== 1 ? "s" : ""} joined
            </p>
            <GreenButton
              label="Start Game"
              type="button"
              onClick={() => navigate(ROUTES.GAME(gameId))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameLobby;

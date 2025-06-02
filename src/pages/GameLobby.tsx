import GreenButton from "../components/common/buttons/GreenButton";
import Title from "../components/common/Title";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import RedButton from "../components/common/buttons/RedButton";
import { Game } from "../api/games/types";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

const GameLobby = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { gameId } = useParams<{ gameId: string }>();
  const [loading, setLoading] = useState(false);
  const { getGameByGameId, deleteGame } = useGameActions(currentUser);
  const [game, setGame] = useState<Game>();

  if (!gameId) {
    throw new Error("Game ID is required to join the lobby.");
  }

  const fetchGameData = async () => {
    setLoading(true);
    try {
      const fetchedGame = await getGameByGameId(gameId);
      if (fetchedGame) {
        setGame(fetchedGame);
        if (fetchedGame.hasStarted) {
          navigate(ROUTES.GAME(gameId), { replace: true });
        }
      }
    } catch (error) {
      console.error("Failed to fetch game data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [gameId, getGameByGameId, navigate]);

  const handleDeleteGame = async () => {
    setLoading(true);
    await deleteGame(game!.id).then(() => {
      navigate(ROUTES.HOME, { replace: true });
    });
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center align-center relative min-h-4/5">
        <LoadingWrapper loading={loading}>
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
              {game && (
                <>
                  <p className="text-sm text-gray-500">
                    {game.playerCount} player{game.playerCount !== 1 ? "s" : ""}{" "}
                    joined
                  </p>
                  {game.playerCount > 1 && (
                    <GreenButton
                      label="Start Game"
                      type="button"
                      onClick={() => navigate(ROUTES.GAME(gameId))}
                    />
                  )}
                </>
              )}
              <RedButton onClick={handleDeleteGame} label="Cancel Game" />
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </>
  );
};

export default GameLobby;

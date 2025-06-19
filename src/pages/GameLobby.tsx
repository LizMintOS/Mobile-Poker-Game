import GreenButton from "../components/common/buttons/GreenButton";
import Title from "../components/common/Title";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useGameProxy } from "../api/games/GameProxy";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import RedButton from "../components/common/buttons/RedButton";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGame } from "../contexts/GameProvider";

const GameLobby = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { game, gameId, clearGame } = useGame();
  const [loading, setLoading] = useState(false);
  const { deleteGame, updateGameTransaction } = useGameProxy(currentUser);

  console.log("Lobby: ", game?.id ?? null);

  const handleDeleteGame = async () => {
    setLoading(true);
    if (gameId) await deleteGame(gameId, clearGame);
    setLoading(false);
  };

  const startGame = async () => {
    setLoading(true);
    const gameStart = await updateGameTransaction(gameId!, {
      hasStarted: true,
    });
    if (gameStart) {
      setLoading(false);
      navigate(ROUTES.GAME(gameId!));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center align-center relative min-h-4/5">
        <LoadingWrapper loading={loading}>
          <div className="bg-white shadow-xl rounded-2xl p-8 w-fit text-center border-1 border-slate-100/50">
            <Title title="Welcome to the Game Lobby!" />
            <div className="flex flex-col items-center justify-center space-y-4 mt-2">
              <p className="text-lg text-green-600 font-semibold italic rounded-3xl border-2 p-2 px-4 mt-2">
                {game?.id ?? "no game ID found"}
              </p>
              <p className="text-lg text-gray-700 mb-0">
                Send this code to your friends to join the lobby
              </p>
              <p className="text-lg text-gray-700">
                Need at least 2 players to start game
              </p>
              {game && (
                <>
                  <p className="text-sm text-gray-500">
                    {game.playerCount} player{game.playerCount !== 1 ? "s" : ""}{" "}
                    joined
                  </p>
                  {game.creatorId === currentUser!.uid ? (
                    <>
                      {game.playerCount > 1 && (
                        <div className="w-full h-14">
                          <GreenButton
                            label="Start Game"
                            type="button"
                            onClick={() => startGame()}
                          />
                        </div>
                      )}
                      <RedButton
                        onClick={handleDeleteGame}
                        label="Cancel Game"
                      />
                    </>
                  ) : (
                    <p className="italic text-green-600">Waiting for game creator to start game...</p>
                  )}
                </>
              )}
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </>
  );
};

export default GameLobby;

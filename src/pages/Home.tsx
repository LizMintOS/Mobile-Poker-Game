import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { Card, shuffleCards } from "../utils/shuffleCards";
import { useState } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import InputItem from "../components/common/form/InputItem";
import FormBody from "../components/common/form/FormBody";
import { SubmitHandler, useForm } from "react-hook-form";
import { useError } from "../contexts/ErrorProvider";
import { usePlayerActions } from "../api/players/functions";

type FormValues = {
  gameId: string;
  error?: string;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame, listenToGame, getGameByGameId } =
    useGameActions(currentUser);
  const { addPlayer } = usePlayerActions(currentUser);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState<string>("");
  const [joining, setJoining] = useState<boolean>(false);
  const { error, clearError } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    clearErrors,
  } = useForm<FormValues>();

  const inputConfig = [
    {
      label: "Game ID",
      type: "text",
      register: {
        ...register("gameId", {
          required: joining ? "Game ID is required" : false,
        }),
      },
      error: errors.gameId?.message ?? null,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e),
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleErrors();
  };

  const handleErrors = () => {
    clearErrors();
    clearError();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleErrors();

    setGameId(data.gameId);

    joining ? await handleJoinGame() : await handleGameCreation();

    if (gameId && !loading) navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
  };

  const handleGameCreation = async () => {
    setLoading(true);

    const startingDeck: Card[] = shuffleCards();
    console.log("Starting deck first card: ", startingDeck[0]);

    setGameId(await createGame(startingDeck, startingDeck.slice(0, 5)));

    if (gameId) {
      console.log("New Game ID: ", gameId);
    }

    setLoading(false);
  };

  const handleJoinGame = async () => {
    const game = await getGameByGameId(gameId);
    if (game) {
      const player = await addPlayer(game);
    }
    // await addPlayer(game);
    // update game fb fn
    navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full mx-auto p-6 min-w-sm"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingWrapper loading={loading}>
          <div className="flex flex-col items-center space-y-4 h-fit">
            <InputItem
              label="Game ID"
              type="text"
              value={gameId}
              onChange={(e) => handleJoinGame(e)}
            />
            <GreenButton
              type="button"
              onClick={handleGameCreation}
              label="Create Game"
            />
          </div>
        </LoadingWrapper>
      </div>
    </form>
  );
};

export default HomePage;

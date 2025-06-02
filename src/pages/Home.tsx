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
  const { createGame, getGameByGameId } = useGameActions(currentUser);
  const { addPlayer } = usePlayerActions(currentUser);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState<string>("");
  const [joining, setJoining] = useState<boolean>(true);
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
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        handleErrors();
      },
    },
  ];

  const handleErrors = () => {
    clearErrors();
    clearError();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleErrors();

    setGameId(data.gameId);

    const game = await getGameByGameId(gameId);

    let player;
    if (game) {
      player = await addPlayer(game);
    }

    if (gameId && !loading)
      navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
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

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="mb-8">
        <GreenButton
          type="button"
          onClick={handleGameCreation}
          label="Create Game"
        />
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-8 self-center w-fit text-center border-1 border-slate-100/50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full mx-auto p-6 min-w-sm"
        >
          <FormBody
            error={error}
            isLoading={isLoading || isSubmitting}
            title="Play Now!"
            inputConfigs={inputConfig}
            disabled={isSubmitting || isLoading || !!error}
            label="Join"
          />
        </form>
      </div>
    </div>
  );
};

export default HomePage;

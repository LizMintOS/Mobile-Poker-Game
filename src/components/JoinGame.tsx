import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormBody from "./common/form/FormBody";

import { useGame } from "../contexts/GameProvider";
import { useError } from "../contexts/ErrorProvider";
import { useLoading } from "../contexts/LoadingProvider";

import { useGameForm } from "../hooks/useSubmitForm";
import { ROUTES } from "../routes/routes";

type FormValues = {
  gameId: string;
  error?: string;
};

const JoinGameComponent = () => {
  const { setGameId, clearGame } = useGame();
  const { error, clearError } = useError();
  const { handleSubmitForm } = useGameForm();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

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
          required: "Game ID is required",
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
    setLoading(true);

    handleErrors();

    clearGame();

    const newGameId = await handleSubmitForm(data);
    if (newGameId) {
      console.log("JOINED", newGameId);
      setGameId(newGameId);
      console.log("New Game ID: ", newGameId);
      const newId = localStorage.getItem("gameId");
      if (newId) {
        console.log("Got new ID: ", newId)
        setGameId(newId);
        
        navigate(ROUTES.GAME_LOBBY(newId), { replace: true });
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 self-center w-fit text-center border-1 border-slate-100/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto p-6 min-w-sm"
      >
        <FormBody
          error={error}
          isLoading={isLoading || isSubmitting || loading}
          title="Play Now!"
          inputConfigs={inputConfig}
          disabled={isSubmitting || isLoading || !!error}
          label="Join"
        />
        <h2>Please refresh page after you join!</h2>
      </form>
    </div>
  );
};

export default JoinGameComponent;

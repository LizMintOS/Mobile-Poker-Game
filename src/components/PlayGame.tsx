import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import GreenButton from "./common/buttons/GreenButton";
import FormBody from "./common/form/FormBody";

import { useAuth } from "../contexts/AuthProvider";
import { useGame } from "../contexts/GameProvider";
import { useError } from "../contexts/ErrorProvider";

import { useGameActions } from "../api/games/functions";
import { usePlayerActions } from "../api/players/functions";

import { useGameForm } from "../api/hooks/useSubmitForm";

type FormValues = {
  gameId: string;
  error?: string;
};

const PlayGameComponent = () => {
  const { currentUser } = useAuth();
  const { game, setGame } = useGame();
  const { error, clearError } = useError();
  const { addPlayer } = usePlayerActions(currentUser);
  const { createGame, getGameByGameId } = useGameActions(currentUser);
  const { handleSubmitForm } = useGameForm({user: currentUser});

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
    handleErrors();
    await handleSubmitForm(data).then(() => {
        if (!errors && !error)
    });
    console.log("Success");
  }
};

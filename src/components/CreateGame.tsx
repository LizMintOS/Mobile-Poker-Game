import GreenButton from "./common/buttons/GreenButton";

import { useLoading } from "../contexts/LoadingProvider";

import { Card, shuffleCards, addCardsToHand } from "../utils/cards";

import { useGameActions } from "../api/games/functions";

import { useGame } from "../contexts/GameProvider";
import { useAuth } from "../contexts/AuthProvider";
import { ROUTES } from "../routes/routes";
import { useNavigate } from "react-router";
import { Game } from "../api/games/types";

const CreateGame = () => {
  const { currentUser } = useAuth();
  const { setLoading } = useLoading();
  const { setGame } = useGame();
  const navigate = useNavigate();
  const { createGame } = useGameActions(currentUser);

  const handleGameCreation = async () => {
    setLoading(true);

    const startingDeck: Card[] = shuffleCards();
    console.log("Starting deck first card: ", startingDeck[0]);

    const newGame: Game = (await createGame(
      startingDeck.slice(5),
      addCardsToHand(startingDeck, 5)
    )) as Game;

    if (newGame) {
      setGame(newGame);
      console.log("New Game ID: ", newGame.id);
      navigate(ROUTES.GAME_LOBBY(newGame.id));
    }
    setLoading(false);
  };
  return (
    <div className="mb-8 h-14">
      <GreenButton
        type="button"
        onClick={handleGameCreation}
        label="Create Game"
      />
    </div>
  );
};

export default CreateGame;

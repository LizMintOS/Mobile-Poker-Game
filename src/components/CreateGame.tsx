import GreenButton from "./common/buttons/GreenButton";

import { useLoading } from "../contexts/LoadingProvider";

import { Card, shuffleCards, addCardsToHand } from "../utils/cards";

import { useGameProxy } from "../api/proxies/GameProxy";

import { useGame } from "../contexts/GameProvider";
import { useAuth } from "../contexts/AuthProvider";

import { Game } from "src/api/types";

const CreateGame = () => {
  const { currentUser } = useAuth();
  const { setLoading } = useLoading();
  const { setGameId } = useGame();
  const { createGame } = useGameProxy(currentUser);

  const handleGameCreation = async () => {
    setLoading(true);

    const startingDeck: Card[] = shuffleCards();
    console.log("Starting deck first card: ", startingDeck[0]);

    const newGame: Game = await createGame(
      startingDeck.slice(5),
      addCardsToHand(startingDeck, 5)
    ) as Game;

    console.log(newGame.id);

    if (newGame) {
      setLoading(false);
      console.log("CreateGame Component New Game: ", newGame)
      setGameId(newGame.id);
      console.log("New Game ID: ", newGame.id);
    }
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

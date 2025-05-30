import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { Card, shuffleCards } from "../utils/shuffleCards";
import { useState } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import InputItem from "../components/common/form/InputItem";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame } = useGameActions(currentUser);
  const [loading, setLoading] = useState(false);
  const [gameId, setGameId] = useState<string>("");

  const handleGameCreation = async () => {
    setLoading(true);

    const startingDeck: Card[] = shuffleCards();
    console.log("Starting deck first card: ", startingDeck[0]);

    setGameId(await createGame(startingDeck, startingDeck.slice(0, 5)));

    if (gameId) {
      console.log("New Game ID: ", gameId);
      navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
    }
    
    setLoading(false);
  };

  const handleJoinGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGameId(e.target.value)
    // update game fb fn
    navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LoadingWrapper loading={loading}>
        <div className="flex flex-col items-center space-y-4 h-fit">
          <InputItem label="Game ID" type="text" value={gameId} onChange={(e) => handleJoinGame(e)} />
          <GreenButton
            type="button"
            onClick={handleGameCreation}
            label="Create Game"
          />
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default HomePage;

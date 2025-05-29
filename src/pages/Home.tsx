import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { Card, shuffleCards } from "../utils/shuffleCards";
import { useState } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useError } from "../contexts/ErrorProvider";

const HomePage = () => {
  const { error } = useError();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame } = useGameActions(currentUser);
  const [loading, setLoading] = useState(false);

  const handleGameCreation = async () => {
    setLoading(true);
    const startingDeck: Card[] = shuffleCards();
    console.log("Starting deck first card: ", startingDeck[0]);
    const gameId = await createGame(startingDeck, startingDeck.slice(0, 5));
    
    if (gameId) {
      setLoading(false);
      console.log("In nav: ", gameId);
      navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LoadingWrapper loading={loading}>
        <div className="flex flex-col items-center space-y-4 h-fit">
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

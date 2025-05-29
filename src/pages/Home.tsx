import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { Card, shuffleCards } from "../utils/shuffleCards";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame } = useGameActions(currentUser);

  const handleGameCreation = async () => {
    const startingDeck: Card[] = shuffleCards();
    const gameId = await createGame(startingDeck, startingDeck.slice(0, 5));

    if (gameId) {
      navigate(ROUTES.GAME_LOBBY(gameId), { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-4 h-fit">
        <GreenButton
          type="button"
          onClick={handleGameCreation}
          label="Create Game"
        />
      </div>
    </div>
  );
};

export default HomePage;

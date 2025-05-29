import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame } = useGameActions(currentUser);

  const handleGameCreation = async () => {
    // call get deck function then send to create game
    const game = await createGame();

    if (game) {
      navigate(ROUTES.GAME_LOBBY(game), { replace: true });
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

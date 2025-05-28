import { useNavigate } from "react-router";
import PressButton from "../components/common/buttons/PressButton";
// import { useNavigation } from "../contexts/NavProvider";
import { ROUTES } from "../routes/routes";
import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createGame } = useGameActions(currentUser);

  const handleGameCreation = async () => {
    await createGame().then(() => {
      navigate(ROUTES.GAME_LOBBY, { replace: true });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-4 h-fit">
        <PressButton
          type="button"
          onClick={() => navigate(ROUTES.CREATE_GAME)}
          style="bg-green-600 border-green-700"
        >
          Create a Game
        </PressButton>
        <p>hello</p>
      </div>
    </div>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import CreateGame from "../components/CreateGame";
import JoinGameComponent from "../components/JoinGame";
import { useGame } from "../contexts/GameProvider";

const HomePage = () => {
  const navigate = useNavigate();
  const { game } = useGame();

  return (
    <div className="flex justify-center items-center h-full flex-col">
      {!game ? (
        <>
          <CreateGame />
          <JoinGameComponent />
        </>
      ) : (
        <div className="mb-8 h-14">
          <GreenButton
            type="button"
            onClick={() => navigate(ROUTES.GAME_LOBBY(game.id))}
            label="Enter Game Lobby"
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;

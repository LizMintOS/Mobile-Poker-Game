import { useNavigate } from "react-router";
import PressButton from "../components/common/buttons/PressButton";
// import { useNavigation } from "../contexts/NavProvider";
import { ROUTES } from "../routes/routes";

const HomePage = () => {
  const navigate = useNavigate();

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

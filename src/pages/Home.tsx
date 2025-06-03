import { useNavigate } from "react-router";
import GreenButton from "../components/common/buttons/GreenButton";
import { ROUTES } from "../routes/routes";
import { useAuth } from "../contexts/AuthProvider";
import CreateGame from "../components/CreateGame";
import PlayGameComponent from "../components/PlayGame";


const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <CreateGame />
      <PlayGameComponent />
    </div>
  );
};

export default HomePage;

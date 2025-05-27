import PressButton from "../components/common/buttons/PressButton";
import { useNavigation } from "../contexts/NavProvider";

const HomePage = () => {
  const { goForward } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4 h-fit">
        <PressButton
          type="button"
          onClick={() => goForward("create")}
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

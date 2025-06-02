import PressButton from "./PressButton";
import useLogout from "../../../api/hooks/useLogout";

type LogoutButtonProps = {
  gameId: string | null;
};

const LogoutButton = ({ gameId }: LogoutButtonProps) => {
  const { handleLogout } = useLogout(gameId);
  return (
    <PressButton
      type="button"
      onClick={handleLogout}
      style="bg-red-400 border-red-600"
    >
      Logout
    </PressButton>
  );
};

export default LogoutButton;

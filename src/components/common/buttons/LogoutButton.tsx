import PressButton from "./PressButton";
import useLogout from "../../../api/hooks/useLogout";


const LogoutButton = () => {
  const { handleLogout } = useLogout();
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

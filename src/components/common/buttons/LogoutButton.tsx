import PressButton from "../PressButton";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <PressButton
      type="button"
      onClick={onLogout}
      style="bg-red-400 border-red-600"
    >
      Logout
    </PressButton>
  );
};

export default LogoutButton;

import PressButton from "./PressButton";

const RedButton = (onClick: () => {}) => {
  return (
    <PressButton
      type="button"
      onClick={onClick}
      style="bg-red-400 border-red-600"
    >
      Logout
    </PressButton>
  );
};

export default RedButton;
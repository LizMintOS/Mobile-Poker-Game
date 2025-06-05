import PressButton from "./PressButton";

interface RedButtonProps {
  onClick: () => void;
  label: string;
}

const RedButton = ({ onClick, label }: RedButtonProps) => {
  return (
    <div className="h-14">
      <PressButton
        type="button"
        onClick={onClick}
        style="bg-red-400 border-red-600"
      >
        {label}
      </PressButton>
    </div>
  );
};

export default RedButton;

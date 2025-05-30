import { GoArrowRight } from "react-icons/go";
import PressButton from "../buttons/PressButton";

interface GreenButtonProps {
  disabled?: boolean;
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
}

const GreenButton = ({
  disabled,
  label,
  type,
  onClick,
}: GreenButtonProps) => {
  return (
    <div className="flex mr-2 w-full">
      <PressButton
        type={type}
        style="bg-green-500 bg-green-600 border-green-700"
        disabled={disabled}
        onClick={onClick}
      >
        {label}
        <span className="flex items-center justify-center ml-2 self-end transition-all duration-300 group">
          <GoArrowRight className="wiggle" size={26} />
        </span>
      </PressButton>
    </div>
  );
};

export default GreenButton;

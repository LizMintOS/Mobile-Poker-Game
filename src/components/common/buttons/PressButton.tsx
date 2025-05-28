import { ReactNode } from "react";

interface PressButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  style?: string;
  children: ReactNode;
}

const PressButton = ({
  type = "button",
  disabled = false,
  onClick,
  style = "",
  children,
}: PressButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl py-2 px-4 text-white text-lg border-b-8 transition-border duration-100 w-full font-bold cursor-pointer border-x-2 hover:border-b-4 overflow-hidden ${style}`}
    >
      <div className="flex items-center justify-center">{children}</div>
    </button>
  );
};

export default PressButton;

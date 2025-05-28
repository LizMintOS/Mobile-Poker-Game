interface ClickMeTextProps {
  message: string;
  onClick: () => void;
}

const ClickMeText = ({ message, onClick }: ClickMeTextProps) => (
  <div className="flex items-center justify-center mr-6">
    <div className="mr-2">👉</div>
    <div className="flex flex-row" onClick={onClick}>
      <p className="text-md w-fit self-center font-bold text-green-500 cursor-pointer underline underline-offset-6">
        {message}
      </p>
    </div>
  </div>
);

export default ClickMeText;

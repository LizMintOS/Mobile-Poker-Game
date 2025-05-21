interface InputItemProps {
  label: string;
  value: string;
  type: string;
  onChange?: (value: any) => void;
}

// Turns given props into an Input component with a label, placeholder, value, and onChange handler.
export const InputItem = ({ label, value, type, onChange }: InputItemProps) => {
  return (
    <div>
      <input
        type={type}
        name={label}
        placeholder={label.charAt(0).toUpperCase() + label.slice(1)}
        value={value}
        onChange={onChange}
        className="w-full p-2 my-2 border border-gray-300 rounded-xl font-medium"
      />
    </div>
  );
};

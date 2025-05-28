import ErrorMessage from "../ErrorMessage";

interface InputItemProps {
  label: string;
  type: string;
  htmlFor?: string;
  register?: any;
  error?: string | null;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
  disabled?: boolean;
}

const InputItem = ({
  label,
  type = "text",
  htmlFor,
  register,
  error,
  placeholder,
  onChange,
  disabled,
}: InputItemProps) => (
  <div className="flex flex-col w-full mb-4">
    <label
      htmlFor={htmlFor}
      className="text-gray-700 font-medium self-start ml-2 mb-2"
    >
      {label}
    </label>
    <input
      {...register}
      type={type}
      id={htmlFor}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl border w-full ${
        error ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

export default InputItem;

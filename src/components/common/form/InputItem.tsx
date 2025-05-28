import ErrorMessage from "../ErrorMessage";

interface InputItemProps {
  label: string;
  type: string;
  register?: any;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputItem = ({
  label,
  type = "text",
  register,
  error,
  onChange,
}: InputItemProps) => (
  <div className="flex flex-col w-full mt-6">
    <label
      htmlFor={label.toLowerCase()}
      className="text-gray-700 font-medium self-start ml-2 mb-2"
    >
      {label}
    </label>
    <input
      {...register}
      type={type}
      id={label.toLowerCase()}
      placeholder={`Enter your ${label.toLowerCase()}`}
      onChange={onChange}
      className={`px-4 py-2 rounded-xl border w-full ${
        error ? "border-red-500 mb-2" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

export default InputItem;

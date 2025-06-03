import ErrorMessage from "../ErrorMessage";
import { InputConfig } from "../../types";

const InputItem = ({
  label,
  type = "text",
  register,
  value,
  error,
  onChange,
}: InputConfig) => (
  <div className="flex flex-col w-full mt-6">
    <label
      htmlFor={label.toLowerCase().replace(" ", "")}
      className="text-gray-700 font-medium self-start ml-2 mb-2"
    >
      {label}
    </label>
    {register ? (
      <input
        {...register}
        type={type}
        id={label.toLowerCase().replace(" ", "")}
        placeholder={`Enter your ${label.toLowerCase()}`}
        onChange={onChange}
        className={`px-4 py-2 rounded-xl border w-full ${
          error ? "border-red-500 mb-2" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    ) : (
      <input
        value={value}
        type={type}
        id={label.toLowerCase().replace(" ", "")}
        placeholder={`Enter your ${label.toLowerCase()}`}
        onChange={onChange}
        className={`px-4 py-2 rounded-xl border w-full ${
          error ? "border-red-500 mb-2" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    )}

    {error && <ErrorMessage message={error} />}
  </div>
);

export default InputItem;

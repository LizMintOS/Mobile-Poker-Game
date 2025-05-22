import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputItemProps {
  label: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onInputChange?: () => void;
}

export const InputItem = ({
  label,
  register,
  type = "text",
  placeholder,
  error,
  onInputChange,
  ...rest
}: InputItemProps) => {
  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-xl gap-1">
      <label className="text-gray-700 font-medium">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        {...register}
        {...rest}
        type={type}
        name={label}
        placeholder={
          placeholder ?? label.charAt(0).toUpperCase() + label.slice(1)
        }
        className={`px-4 py-2 rounded-xl border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        onChange={(e) => {
          register.onChange(e); 
          onInputChange && onInputChange(); 
        }}
      />
      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { InputItem } from "./InputItem";

interface InputListProps {
  fieldNames: string[];
  register: UseFormRegister<any>;
  errors: FieldErrors<{ items: Record<number, any> }>;
  addItem: () => void;
  removeItem: (index: number) => void;
  label: string;
  placeholder?: string;
}

export const InputList: React.FC<InputListProps> = ({
  fieldNames,
  register,
  errors,
  addItem,
  removeItem,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {fieldNames.map((name, index) => (
        <div key={name} className="flex items-center gap-3">
          <InputItem
            label={`Item ${index + 1}`}
            register={register(`items.${index}`, {
              required: "This field is required",
            })}
            placeholder={placeholder}
            error={errors.items?.[index] as FieldError | undefined}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
          ></button>
        </div>
      ))}
    </div>
  );
};

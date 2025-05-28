import InputItem from "./InputItem";

interface InputConfig {
  label: string;
  type: string;
  htmlFor?: string;
  register?: any;
  error?: string | null;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
  disabled?: boolean;
}

interface InputListProps {
  inputs: InputConfig[];
}

const InputList = ({ inputs }: InputListProps) => (
  <div className="flex flex-col w-full rounded-xl gap-1 mb-3">
    {inputs.map((inputConfig, index) => (
      <InputItem key={index} {...inputConfig} />
    ))}
  </div>
);

export default InputList;

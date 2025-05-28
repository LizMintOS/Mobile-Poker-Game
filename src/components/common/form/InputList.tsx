import InputItem from "./InputItem";

interface InputConfig {
    label: string;
    type: string;
    register?: any;
    error?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputListProps {
  inputs: InputConfig[];
}

const InputList = ({ inputs }: InputListProps) => (
  <div className="flex flex-col w-full rounded-xl mb-4">
    {inputs.map((inputConfig, index) => (
      <InputItem key={index} {...inputConfig} />
    ))}
  </div>
);

export default InputList;

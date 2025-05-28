import InputItem from "./InputItem";
import { InputListProps } from "../../types";

const InputList = ({ inputs }: InputListProps) => (
  <div className="flex flex-col w-full rounded-xl mb-4">
    {inputs.map((inputConfig, index) => (
      <InputItem key={index} {...inputConfig} />
    ))}
  </div>
);

export default InputList;

export type InputConfig = {
  label: string;
  type: string;
  register?: any;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
export type InputListProps = {
  inputs: InputConfig[];
}
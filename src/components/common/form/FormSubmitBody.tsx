import GreenSubmitButton from "./GreenButton";

interface FormSubmitBodyProps {
  children: React.ReactNode;
  disabled: boolean;
  label: string;
  
}

const FormSubmitBody = ({ children, disabled, label }: FormSubmitBodyProps) => {
  return (
    <div className="flex flex-row w-full justify-between h-14">
      <GreenSubmitButton disabled={disabled} label={label} />
      {children && <div className="flex flex-col items-center">{children}</div>}
    </div>
  );
};

export default FormSubmitBody;

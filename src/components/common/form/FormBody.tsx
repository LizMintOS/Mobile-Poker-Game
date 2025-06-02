import ErrorMessage from "../ErrorMessage";
import { LoadingWrapper } from "../LoadingWrapper";
import Title from "../Title";
import InputList from "./InputList";
import { InputConfig } from "../../types";
import FormSubmitBody from "./FormSubmitBody";

interface FormBodyProps {
  error: string | null;
  isLoading: boolean;
  title: string;
  inputConfigs: InputConfig[];
  disabled: boolean;
  label: string;
  children?: React.ReactNode;
}

const FormBody = ({
  error,
  isLoading,
  title,
  inputConfigs,
  disabled,
  label,
  children,
}: FormBodyProps) => (
  <>
    <Title title={title} />
    <InputList inputs={inputConfigs} />
    {error && <ErrorMessage message={error} />}

    <LoadingWrapper loading={isLoading}>
      <div className="flex flex-col items-center gap-6 w-full">
        <FormSubmitBody disabled={disabled} label={label}>
          {children}
        </FormSubmitBody>
      </div>
    </LoadingWrapper>
  </>
);

export default FormBody;

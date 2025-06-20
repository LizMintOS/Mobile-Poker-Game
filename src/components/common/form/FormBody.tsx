import ErrorMessage from "src/components/common/ErrorMessage";
import { LoadingWrapper } from "src/components/common/LoadingWrapper";
import Title from "src/components/common/Title";
import InputList from "src/components/common/form/InputList";
import { InputConfig } from "src/components/types";
import FormSubmitBody from "src/components/common/form/FormSubmitBody";

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

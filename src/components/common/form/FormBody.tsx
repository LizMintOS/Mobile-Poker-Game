import ErrorMessage from "../ErrorMessage";
import { LoadingWrapper } from "../LoadingWrapper";
import Title from "../Title";
import InputList from "./InputList";
import { InputConfig } from "../../types";
import FormSubmitBody from "./FormSubmitBody";
import ClickMeText from "../ClickMeText";

interface FormBodyProps {
  error: string | null;
  isLoading: boolean;
  title: string;
  inputConfigs: InputConfig[];
  disabled: boolean;
  label: string;
  children: React.ReactNode;
  clickMessage: string;
  onClick: () => void;
}

const FormBody = ({
  error,
  isLoading,
  title,
  inputConfigs,
  disabled,
  label,
  children,
  clickMessage,
  onClick,
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
        <ClickMeText message={clickMessage} onClick={onClick} />
      </div>
    </LoadingWrapper>
  </>
);

export default FormBody;

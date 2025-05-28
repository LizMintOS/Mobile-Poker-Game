import ErrorMessage from "../ErrorMessage";
import { LoadingWrapper } from "../LoadingWrapper";
import Title from "../Title";
import InputList from "./InputList";

interface FormBodyProps {
  error: string | null;
  isLoading: boolean;
  title: string;
  inputConfigs: 
}

const FormBody = ({ error, isLoading, title }: FormBodyProps) => (
  <>
    <Title title={title} />
      <InputList inputs={inputConfigs} />
      {error && <ErrorMessage message={error} />}
  </>
);

export default FormBody;

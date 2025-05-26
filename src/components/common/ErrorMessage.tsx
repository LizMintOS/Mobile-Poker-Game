interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className="text-sm text-red-500 mt-2">{message}</span>
);

export default ErrorMessage;
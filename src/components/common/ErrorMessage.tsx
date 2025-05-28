interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="text-sm text-red-500">{message}</div>
);

export default ErrorMessage;
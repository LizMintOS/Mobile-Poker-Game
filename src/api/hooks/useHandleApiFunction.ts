import { useError } from "../../contexts/ErrorProvider";
import { mapErrorToConstantErrorMessage } from "../errors/functions";

export const useHandleApiFunction = () => {
  const { setError, clearError } = useError();

  const handleApiErrors = <T extends (...args: any[]) => any>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      clearError();
      try {
        return await fn(...args);
      } catch (error: any) {
        const mappedError = mapErrorToConstantErrorMessage(error);
        setError(mappedError);
      }
    };
  };
  return { handleApiErrors };
};

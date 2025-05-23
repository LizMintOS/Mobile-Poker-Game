import { useState } from "react";
import { useError } from "../../contexts/ErrorProvider";
import { mapErrorToConstantErrorMessage } from "../errors/functions";

export const useHandleApiFunction = () => {
  const [loading, setLoading] = useState(false);
  const { setError, clearError } = useError();

  const handleApiErrors = <T extends (...args: any[]) => any>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<void>) => {
    return async (...args: Parameters<T>) => {
      setLoading(true);
      clearError();
      try {
        return await fn(...args);
      } catch (error: any) {
        const mappedError = mapErrorToConstantErrorMessage(error);
        setError(mappedError);
      } finally {
        setLoading(false);
      }
    };
  };
  return { handleApiErrors, loading };
};

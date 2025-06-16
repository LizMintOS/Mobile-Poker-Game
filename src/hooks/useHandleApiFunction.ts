import { useCallback } from "react";
import { showErrorToast } from "../../components/common/Toast";
import { useError } from "../../contexts/ErrorProvider";
import { mapErrorToConstantErrorMessage } from "../errors/functions";
import { useLoading } from "../../contexts/LoadingProvider";

export const useHandleApiFunction = () => {
  const { setError, clearError } = useError();
  const { setLoading } = useLoading();

  const handleApiErrors = useCallback(
    <T extends (...args: any[]) => any>(
      fn: T
    ): ((...args: Parameters<T>) => Promise<any>) => {
      return async (...args: Parameters<T>) => {
        clearError();
        try {
          return await fn(...args);
        } catch (error: any) {
          console.error("API Error:", error);
          const mappedError = mapErrorToConstantErrorMessage(error);
          setError(mappedError);
          showErrorToast(
            typeof mappedError === "string"
              ? mappedError
              : JSON.stringify(mappedError)
          );
          
          throw error;
        } finally {
          setLoading(false);
        }
      };
    },
    [clearError, setError]
  );
  return { handleApiErrors };
};

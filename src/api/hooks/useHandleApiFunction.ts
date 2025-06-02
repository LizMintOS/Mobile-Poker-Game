import { useCallback } from "react";
import { showErrorToast } from "../../components/common/Toast";
import { useError } from "../../contexts/ErrorProvider";
import { mapErrorToConstantErrorMessage } from "../errors/functions";

export const useHandleApiFunction = () => {
  const { setError, clearError } = useError();

  const handleApiErrors = useCallback(<T extends (...args: any[]) => any>(
    fn: T
  ): ((...args: Parameters<T>) => Promise<any>) => {
    return async (...args: Parameters<T>) => {
      clearError();
      try {
        return await fn(...args);
      } catch (error: any) {
        console.error("API Error:", error);
        const mappedError = typeof error === "string" ? error : mapErrorToConstantErrorMessage(error);
        setError(mappedError);
        showErrorToast(typeof mappedError === "string" ? mappedError : JSON.stringify(mappedError));
        throw error;
      }
    };
  }, [clearError, setError])
  return { handleApiErrors };
};

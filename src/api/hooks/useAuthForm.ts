import { useAuthActions } from "../auth/functions";

interface UseAuthFormProps {
  isLogin: boolean;
  isAnon: boolean;
  clearError: () => void;
  clearErrors: () => void;
  setIsAnon: (value: boolean) => void;
}

interface AuthFormData {
  email: string;
  password: string;
}

const useAuthForm = ({
  isLogin,
  isAnon,
  clearError,
  clearErrors,
  setIsAnon,
}: UseAuthFormProps) => {
  const { loginAnonymouslyUser, registerUser, loginUser } = useAuthActions();
  const handleSubmitForm = async (data: AuthFormData): Promise<void> => {
    clearErrors();
    clearError();

    if (!isAnon && data.email && data.password) {
      isLogin
        ? await loginUser(data.email, data.password)
        : await registerUser(data.email, data.password);
    } else if (isAnon) {
      await loginAnonymouslyUser();
      setIsAnon(false);
    }
  };

  return { handleSubmitForm };
};

export default useAuthForm;

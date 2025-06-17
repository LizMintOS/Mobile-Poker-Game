import { AuthService } from "./AuthService";
import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";

export const useAuthProxy = () => {
  const { handleApiErrors } = useHandleApiFunction();

  return {
    registerUser: handleApiErrors(async (email: string, password: string) =>
      await AuthService.register(email, password)
    ),

    loginUser: handleApiErrors(async (email: string, password: string) =>
      await AuthService.login(email, password)
    ),

    logoutUser: handleApiErrors(async () => await AuthService.logout()),

    loginAnonymouslyUser: handleApiErrors(async () => await AuthService.loginAnonymously()),
  };
};

export const subscribeToAuthChanges = AuthService.onAuthChange;
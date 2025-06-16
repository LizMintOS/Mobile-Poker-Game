import { AuthService } from "./AuthService";
import { useHandleApiFunction } from "../../hooks/useHandleApiFunction";

export const useAuthProxy = () => {
  const { handleApiErrors } = useHandleApiFunction();

  return {
    registerUser: handleApiErrors((email: string, password: string) =>
      AuthService.register(email, password)
    ),

    loginUser: handleApiErrors((email: string, password: string) =>
      AuthService.login(email, password)
    ),

    logoutUser: handleApiErrors(() => AuthService.logout()),

    loginAnonymouslyUser: handleApiErrors(() => AuthService.loginAnonymously()),
  };
};

export const subscribeToAuthChanges = AuthService.onAuthChange;
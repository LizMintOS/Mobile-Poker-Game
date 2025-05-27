import { useCallback } from "react";
import { useAuthActions } from "../auth/functions";

const useLogout = () => {
  const { logoutUser } = useAuthActions();
  const handleLogout = useCallback(async () => {
    await logoutUser();
  }, [logoutUser]);

  return { handleLogout };
};

export default useLogout;
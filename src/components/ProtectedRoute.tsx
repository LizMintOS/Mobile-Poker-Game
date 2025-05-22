import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthProvider";


const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return (
  <>
  <Outlet />
  </>);
};

export default ProtectedRoute;

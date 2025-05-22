import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import Header from "./common/Header";
import { LoadingWrapper } from "./common/LoadingWrapper";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        return <Navigate to="/auth" replace />;
      } else {
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [currentUser]);

  if (!currentUser) {
  }

  return (
    <LoadingWrapper
      loading={loading}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      size={80}
    >
      <>
        <Outlet />
      </>
    </LoadingWrapper>
  );
};

export default ProtectedRoute;

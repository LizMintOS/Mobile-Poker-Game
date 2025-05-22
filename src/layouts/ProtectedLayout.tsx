import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(currentUser)
    const timer = setTimeout(() => {
      if (!currentUser) {
        return <Navigate to="/" replace />;
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
        width: "100vw",
      }}
      size={80}
    >
      <>
        <Header />
        <Outlet />
      </>
    </LoadingWrapper>
  );
};

export default ProtectedRoute;

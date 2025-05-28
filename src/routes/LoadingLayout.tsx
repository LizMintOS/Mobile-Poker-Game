import React, { useState, useEffect } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";

const LoadingGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
      <>{children}</>
    </LoadingWrapper>
  );
};

export default LoadingGuard;

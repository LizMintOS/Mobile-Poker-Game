import { CSSProperties, JSX } from "react";
import { ClipLoader } from "react-spinners";

interface LoadingWrapperProps {
  children: JSX.Element;
  loading: boolean;
  style?: CSSProperties;
  size?: number;
}

export const LoadingWrapper = ({
  children,
  loading,
  style,
  size,
}: LoadingWrapperProps) => {
  return (
    <div>
      {loading ? (
        <div style={style ?? {}}>
          <ClipLoader
            color="#000000"
            loading={loading}
            size={size ?? 20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

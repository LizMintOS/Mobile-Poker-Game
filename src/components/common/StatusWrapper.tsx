import { ClipLoader } from "react-spinners";
import { useStatus } from "../../contexts/StatusProvider";

export const StatusWrapper = () => {
  const { status, message, clearStatus } = useStatus();

  if (status === "idle") return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-xs mx-auto space-y-4">
        {status === "loading" && (
          <>
            <ClipLoader
              className="w-12 h-12 animate-spin text-blue-500 mx-auto"
              size={36}
              aria-label="Loading Spinner"
              data-testid="loader"
              loading={status === "loading"}
            />
            <p className="text-lg font-medium">{message || "Loading..."}</p>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-lg font-medium text-red-600">
              {message || "An error occurred."}
            </p>
            <button
              onClick={clearStatus}
              className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Dismiss
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-lg font-medium text-green-600">
              {message || "Success!"}
            </p>
            <button
              onClick={clearStatus}
              className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  );
};

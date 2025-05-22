import { useForm } from "react-hook-form";
import { InputItem } from "./common/form/InputItem";
import { useAuthActions } from "../api/users/functions";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigation } from "../contexts/NavProvider";
import { useStatus } from "../contexts/StatusProvider";

type AuthFormProps = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const { clearStatus, setStatus } = useStatus();
  const { loginUser, registerUser, loginAnonymouslyUser } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<AuthFormProps>();
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = async (data: AuthFormProps) => {
    try {
      isLogin
        ? await loginUser(data.email, data.password)
        : await registerUser(data.email, data.password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    if (error.code === "auth/user-not-found") {
      setError("email", { type: "manual", message: "User not found" });
    } else if (error.code === "auth/wrong-password") {
      setError("password", { type: "manual", message: "Wrong password" });
    } else if (error.code === "auth/email-already-in-use") {
      setError("email", { message: "Email already in use" });
    } else {
      setStatus("error", "An error occurred", error);
      console.error(error);
    }
  };

  const handleAnonymousSignIn = async () => {
    await loginAnonymouslyUser();
  };

  const handleInputChange = () => {
    clearErrors();
    clearStatus();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-sm mx-auto p-6 border rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      <InputItem
        label="Email"
        type="email"
        register={register("email", {
          required: "Email is required",
        })}
        error={errors.email}
        onInputChange={handleInputChange}
      />

      <InputItem
        label="Password"
        type="password"
        register={register("password", {
          required: "Password is required",
        })}
        error={errors.password}
        onInputChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
      <p
        className="mt-2 text-sm w-full self-center text-green-500 pointer underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Click to Register" : "Click to Login"}
      </p>
      <button onClick={handleAnonymousSignIn} className="auth-anon-button">
        Sign in Anonymously
      </button>
    </form>
  );
};

export const AuthStatusWatcher = () => {
  const { status, clearStatus } = useStatus();
  const { goForward } = useNavigation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (status === "success" && currentUser) {
      const timeout = setTimeout(() => {
        goForward("/dashboard");
        clearStatus();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [status, goForward, clearStatus, currentUser]);

  return null;
};

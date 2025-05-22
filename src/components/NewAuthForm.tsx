import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useAuthActions } from "../api/users/functions";
import { useState } from "react";
import { LoadingWrapper } from "./common/LoadingWrapper";
import { useNavigation } from "../contexts/NavProvider";
import { useError } from "../contexts/ErrorProvider";

type FormValues = {
  email: string;
  password: string;
  error?: string;
};

export const AuthForm = () => {
  const { loginUser, registerUser, loginAnonymouslyUser } = useAuthActions();
  const { goForward } = useNavigation();
  const { error, clearError } = useError();
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
    clearErrors,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    if (!data.email || !data.password) return;

    isLogin
      ? await loginUser(data.email, data.password)
      : await registerUser(data.email, data.password);
  };

  const handleAnonymousSignIn = async () => {
    await loginAnonymouslyUser();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e != null) {
      e.preventDefault();
      const { name } = e.target;
      if (name === "email") {
        clearErrors("email");
      } else if (name === "password") {
        clearErrors("password");
      }
    } else {
      setIsLogin(!isLogin);
      clearErrors();
    }
    clearError();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full mx-auto p-6"
    >
      <h2 className="text-3xl font-bold text-center">
        {isLogin ? "Sign in to play!" : "Create Account"}
      </h2>
      <div className="flex flex-col w-full rounded-xl gap-1 mb-3">
        <div className="flex flex-col w-full mb-4">
          <label className="text-gray-700 font-medium self-start ml-2 mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              onChange: (e) => handleInputChange(e),
            })}
            type="text"
            placeholder="Enter your email"
            className={`px-4 py-2 rounded-xl border w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.email && (
            <span className="text-sm text-red-500 mt-2">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="text-gray-700 font-medium self-start ml-2 mb-2">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              onChange: (e) => handleInputChange(e),
            })}
            type="password"
            placeholder="Enter your password"
            className={`px-4 py-2 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.password && (
            <span className="text-sm text-red-500 mt-2">
              {errors.password?.message}
            </span>
          )}
        </div>
        {error && <span className="text-sm text-red-500 mt-2">{error}</span>}
      </div>

      <LoadingWrapper loading={isSubmitting || isLoading}>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-row w-full justify-between">
            <div className="flex mr-2 w-full">
              <button
                type="submit"
                className="rounded-xl py-2 px-4 text-white text-lg hover:bg-green-500 hover:border-b-8 transition-border duration-100 font-bold bg-green-600 cursor-pointer border-x-2 border-b-4 border-green-700 w-full"
                disabled={!isValid || isSubmitting || isLoading || !!error}
              >
                <div>{isLogin ? "Log in" : "Register"}</div>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleAnonymousSignIn}
                className="group relative flex items-center justify-center text-black text-sm rounded-xl p-2 cursor-pointer bg-gray-400 hover:bg-gray-200 transition-all duration-300 border-x-2 border-b-4 border-gray-600 overflow-hidden"
              >
                <div className="flex items-center py-1">
                  <span className="ml-1 p-1 flex items-center justify-center rounded-3xl inset-shadow-sm inset-shadow-gray-500">
                    👤
                  </span>
                  <span className="ml-1 overflow-hidden whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs">
                    Anonymous
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center mr-6">
            <div className="mr-2 wiggle">👉</div>
            <div
              className="flex flex-row"
              onClick={() => handleInputChange(null)}
            >
              <p className="text-md w-fit self-center font-bold text-green-500 cursor-pointer underline underline-offset-6">
                {isLogin ? " Register" : " Login"}
              </p>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </form>
  );
};

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useAuthActions } from "../api/users/functions";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
  error?: string;
};

export const AuthForm = () => {
  const { loginUser, registerUser, loginAnonymouslyUser } = useAuthActions();
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isLoading },
    clearErrors,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      isLogin
        ? await loginUser(data.email, data.password)
        : await registerUser(data.email, data.password);
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setError("email", {
          type: "manual",
          message: "Invalid email format",
        });
      }
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.log(errors);
  };

  const handleAnonymousSignIn = async () => {
    await loginAnonymouslyUser();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-6 w-full mx-auto p-6"
    >
      <h2 className="text-2xl font-bold text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <div className="flex flex-col w-full rounded-xl gap-1">
        <label className="text-gray-700 font-medium self-start ml-2">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            onChange: () => clearErrors(),
          })}
          type="text"
          placeholder="Enter your email"
          className={`px-4 py-2 mb-4 rounded-xl border w-full ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {/* {errors.email && ( */}
        <span className="text-sm text-red-500">{errors.email?.message}</span>
        {/* )} */}
        <label className="text-gray-700 font-medium self-start ml-2">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            onChange: () => clearErrors(),
          })}
          type="password"
          placeholder="Enter your password"
          className={`px-4 py-2 rounded-xl border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {/* {errors.password && ( */}
        <span className="text-sm text-red-500">{errors.password?.message}</span>
        {/* )} */}
      </div>

      <button
        type="submit"
        className="rounded-xl py-2 px-4 text-white text-base font-semibold bg-green-600 cursor-pointer transition-all duration-100 hover:bg-green-500 hover:shadow-md hover:shadow-green-200 w-full"
        disabled={!isValid || isSubmitting || isLoading}
      >
        Submit
      </button>
      <div className="flex flex-col items-center">
        <p
          className="text-sm w-fit self-center text-green-500 cursor-pointer underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Click to Register" : "Click to Login"}
        </p>
      </div>
      <button
        onClick={handleAnonymousSignIn}
        className="bg-gray-700 text-white text-sm rounded-xl p-2 hover:bg-gray-600 transition-all duration-100 cursor-pointer hover:shadow-md hover:shadow-black-200"
      >
        Sign in Anonymously
      </button>
    </form>
  );
};

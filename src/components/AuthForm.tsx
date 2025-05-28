import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { LoadingWrapper } from "./common/LoadingWrapper";
import { useError } from "../contexts/ErrorProvider";
import { GoArrowRight } from "react-icons/go";
import PressButton from "./common/buttons/PressButton";
import InputItem from "./common/form/InputItem";
import useAuthForm from "../api/hooks/useAuthForm";
import ErrorMessage from "./common/ErrorMessage";
import { ROUTES } from "../routes/routes";
import { useNavigate } from "react-router";
import Title from "./common/Title";
import InputList from "./common/form/InputList";

type FormValues = {
  email: string;
  password: string;
  error?: string;
};

export const AuthForm = () => {
  const { error, clearError } = useError();
  const [isLogin, setIsLogin] = useState(true);
  const [isAnon, setIsAnon] = useState(false);
  const navigate = useNavigate();
  const { handleSubmitForm } = useAuthForm({
    isLogin: isLogin,
    isAnon: isAnon,
    setIsAnon: setIsAnon,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    clearErrors,
  } = useForm<FormValues>();

  const inputConfigs = [
    {
      label: "Email",
      type: "text",
      register: {
        ...register("email", {
          required: !isAnon ? "Email is required" : false,
        }),
      },
      error: errors.email?.message ?? null,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e),
    },
    {
      label: "Password",
      type: "password",
      register: {
        ...register("password", {
          required: !isAnon ? "Password is required" : false,
        }),
      },
      error: errors.password?.message ?? null,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e),
    },
  ];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    clearError();
    clearErrors();
    await handleSubmitForm(data).then(() => {
      if (!error && !errors) {
        navigate(ROUTES.HOME);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e) {
      e.preventDefault();
      const { name } = e.target;
      if (name === "email") {
        clearErrors("email");
      } else if (name === "password") {
        clearErrors("password");
      }
    } else {
      if (!isAnon) setIsLogin(!isLogin);
      clearErrors();
    }
    clearError();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full mx-auto p-6 min-w-sm"
    >
      <Title title={isLogin ? "Sign in to play!" : "Create Account"} />
      <InputList inputs={inputConfigs} />
      {error && <ErrorMessage message={error} />}

      <LoadingWrapper loading={isSubmitting || isLoading}>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-row w-full justify-between h-14">
            <div className="flex mr-2 w-full">
              <PressButton
                type="submit"
                style="bg-green-500 bg-green-600 border-green-700"
                disabled={isSubmitting || isLoading || !!error}
              >
                <div className="flex items-center justify-center">
                  {isLogin ? "Log in" : "Register"}
                  <div className="flex items-center justify-center ml-2 self-end transition-all duration-300 group">
                    <GoArrowRight className="wiggle" size={26} />
                  </div>
                </div>
              </PressButton>
            </div>
            <div className="flex flex-col items-center">
              <PressButton
                type="submit"
                onClick={() => {
                  setIsAnon(true);
                }}
                style="group relative flex italic bg-gray-400 border-gray-600"
                disabled={isSubmitting || isLoading}
              >
                <div className="flex items-center">
                  <span className="mx-2 p-1 flex items-center justify-center rounded-3xl inset-shadow-sm inset-shadow-gray-500">
                    👤
                  </span>
                  <span className="overflow-hidden text-base font-semibold whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs">
                    Sneak in...
                  </span>
                </div>
              </PressButton>
            </div>
          </div>
          <div className="flex items-center justify-center mr-6">
            <div className="mr-2">👉</div>
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

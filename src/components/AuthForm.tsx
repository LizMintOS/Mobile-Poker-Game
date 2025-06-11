import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useError } from "../contexts/ErrorProvider";
import PressButton from "./common/buttons/PressButton";
import { useAuthForm } from "../api/hooks/useSubmitForm";
import { ROUTES } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import FormBody from "./common/form/FormBody";
import ClickMeText from "./common/ClickMeText";

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
        navigate(ROUTES.HOME, { replace: true });
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
      <FormBody
        error={error}
        isLoading={isLoading || isSubmitting}
        title={isLogin ? "Sign in to play!" : "Create Account"}
        inputConfigs={inputConfigs}
        disabled={isSubmitting || isLoading || !!error}
        label={isLogin ? "Log in" : "Register"}
      >
        <PressButton
          type="submit"
          onClick={() => {
            setIsAnon(true);
          }}
          style="group relative flex italic bg-gray-400 border-gray-600"
          disabled={isSubmitting || isLoading}
        >
          <span className="mx-2 p-1 flex items-center justify-center rounded-3xl inset-shadow-sm inset-shadow-gray-500">
            👤
          </span>
          <span className="overflow-hidden text-base font-semibold whitespace-nowrap transition-all duration-300 max-w-0 group-hover:max-w-xs">
            Sneak in...
          </span>
        </PressButton>
      </FormBody>
      <ClickMeText
        message={isLogin ? " Register" : " Login"}
        onClick={() => handleInputChange(null)}
      />
    </form>
  );
};

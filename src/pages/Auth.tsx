// import { AuthForm, AuthStatusWatcher } from "../components/AuthForm";
import { AuthForm } from "../components/NewAuthForm";

const AuthPage = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full text-center">
          {/* <AuthStatusWatcher /> */}
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;

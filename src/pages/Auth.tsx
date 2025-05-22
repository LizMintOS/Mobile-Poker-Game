import { AuthForm } from "../components/AuthForm";

const AuthPage = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full text-center border-1 border-slate-100/50">
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;

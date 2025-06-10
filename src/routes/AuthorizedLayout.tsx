import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const AuthorizedLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;

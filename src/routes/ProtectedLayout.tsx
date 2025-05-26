import { Outlet } from "react-router";
import Header from "../components/common/Header";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;

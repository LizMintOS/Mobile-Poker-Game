import { Outlet } from "react-router";
import Header from "../components/common/Header";

const ProtectedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

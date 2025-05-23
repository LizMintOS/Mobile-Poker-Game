import { Outlet } from "react-router";
import Header from "../components/common/Header";

const ProtectedLayout = () => {
  return (
    <>
      <Header />
      {/* <main className="p-6"> */}
        <Outlet />
      {/* </main> */}
    </>
  );
};

export default ProtectedLayout;

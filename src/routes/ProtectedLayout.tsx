import { Outlet, useParams } from "react-router";
import Header from "../components/common/Header";

const ProtectedLayout = () => {
  const { username } = useParams();
  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header username={username} />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;

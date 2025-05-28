import { Outlet } from "react-router";
import Header from "../components/common/Header";
import { useAuth } from "../contexts/AuthProvider";

const AuthorizedLayout = () => {
  const { currentUser } = useAuth();
  const username = currentUser?.displayName;

  return (
    <div className="flex flex-col h-screen w-screen">
      {username && <Header username={username} />}
      <Outlet />
    </div>
  );
};

export default AuthorizedLayout;

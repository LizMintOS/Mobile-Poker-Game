import { useAuthActions } from "../../api/auth/functions";
import { Link, useParams } from "react-router";
import PressButton from "./PressButton";

const Header = () => {
  const { logoutUser } = useAuthActions();
  const { username } = useParams();
  const style =
    "decoration-none text-white text-lg font-semibold py-8 px-12 rounded-xl transition-bg duration-100 hover:bg-green-400";

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header>
      <nav className="w-full align-center flex flex-row justify-between">
        <div className="flex align-center items-center">
          <h2 className="text-lg font-bold w-fit m-0">{username}</h2>
        </div>
        <div className="flex w-fit align-center items-center justify-between gap-4 m-0">
          <Link to="/create" className={style}>
            Create Game
          </Link>
          <Link to={`/user/${username}`} className={style}>
            Games
          </Link>
          <div className="w-fit items-center flex h-full mx-4">
            <PressButton
              type="button"
              onClick={handleLogout}
              style="bg-red-400 border-red-600"
            >
              Logout
            </PressButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import { useAuthActions } from "../../api/auth/functions";
import { Link, useParams } from "react-router";
import PressButton from "./PressButton";

const Header = () => {
  const { logoutUser } = useAuthActions();
  const { username } = useParams();
  const style =
    "decoration-none text-green-600 text-lg font-semibold py-8 px-12 rounded-xl transition-bg duration-100 hover:bg-green-400";

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header>
      <nav className="w-full align-center flex flex-row justify-between shadow-sm bg-green-50">
        <div className="flex align-center items-center mx-4">
          <h2 className="text-3xl font-bold w-fit text-green-600">{username}</h2>
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

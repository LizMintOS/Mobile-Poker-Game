import { useAuthActions } from "../../api/auth/functions";
import { Link, useParams } from "react-router";
import PressButton from "./PressButton";

const Header = () => {
  const { logoutUser } = useAuthActions();
  const { username, userId } = useParams();
  const style = "decoration-none text-white text-lg font-semibold py-8 px-12 rounded-xl transition-bg duration-100 hover:bg-green-400";

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header>
      <nav className="navbar">
        <div className="left-content">
          <h3 className="username">{username}</h3>
        </div>
        <div className="flex-inline w-fit align-center justify-between gap-2 m-0">
          <Link to="/create" className={style}>
            Create Game
          </Link>
          <Link to={`/${userId}/${username}/home`} className={style}>
            Games
          </Link>
          <PressButton type="button" onClick={handleLogout} style="bg-red-400">
            Logout
          </PressButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;

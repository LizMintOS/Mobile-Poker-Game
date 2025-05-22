import { useAuthActions } from "../../api/auth/functions";
import { useParams } from "react-router";

const Header = () => {
  const { logoutUser } = useAuthActions();
  const { username } = useParams();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header>
      <nav className="navbar">
        <div className="left-content">
          <h3 className="username">{username}</h3>
        </div>
        <div className="button-group">
          <a href="/" className="nav-link">
            Create Game
          </a>
          <a href="/groups/public" className="nav-link">
            Games
          </a>
          <button className="bg-red-400 text-white border-none" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

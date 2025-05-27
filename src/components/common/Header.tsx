import { Link } from "react-router";
import LogoutButton from "./buttons/LogoutButton";

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  return (
    <header>
      <nav className="w-full align-center flex flex-row justify-between shadow-sm bg-green-50">
        <div className="flex align-center items-center">
          <h2 className="text-3xl font-bold w-fit text-green-600 ml-6">
            {username}
          </h2>
        </div>
        <div className="flex align-center items-center justify-between gap-10 m-0 h-full">
          <div className="hover:border-2 hover:border-green-600 w-full h-full p-2 rounded-2xl cursor-pointer">
            <Link
              to={`/user/${username}`}
              className="text-green-600 text-lg font-semibold rounded-xl"
            >
              Games
            </Link>
          </div>
          <div className="w-fit items-center flex h-full m-6">
            <LogoutButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

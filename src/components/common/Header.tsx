import { Link } from "react-router";
import LogoutButton from "./buttons/LogoutButton";
import { ROUTES } from "../../routes/routes";

const Header = () => {
  return (
    <header>
      <nav className="w-full align-center flex flex-row justify-between shadow-sm bg-green-50">
        <div className="flex align-center items-center">
          <h2 className="text-3xl font-bold w-fit text-green-600 ml-6">
            Poker
          </h2>
        </div>
        <div className="flex align-center items-center justify-between gap-10 m-0 h-full">
          <Link
            to={ROUTES.INDEX}
            className="text-green-600 text-lg font-semibold rounded-xl"
          >
            <div className="hover:border-2 hover:border-green-600 w-full h-full p-2 rounded-2xl cursor-pointer">
              Home
            </div>
          </Link>
          <div className="w-fit items-center flex h-full m-6">
            <LogoutButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import useLogout from "../../api/hooks/useLogout";
import RedButton from "./buttons/RedButton";

const Header = () => {
  const { handleLogout } = useLogout();
  return (
    <header>
      <nav className="w-full align-center flex flex-row justify-between shadow-sm bg-green-50">
        <div className="flex align-center items-center">
          <h2 className="text-3xl font-bold w-fit text-green-600 ml-6">
            Poker
          </h2>
        </div>
        <div className="w-fit items-center flex h-14 m-6">
          <RedButton label="Logout" onClick={handleLogout} />
        </div>
      </nav>
    </header>
  );
};

export default Header;

import { useNavigate } from "react-router-dom";
import Search from "../ui/Search";
import Logo from "../Logo";
import Cart from "../Header/Cart";
import Profile from "../Header/Profile";
export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-white shadow ">
        <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-between gap-4">
          <Logo />
          <Search />
          <div className="flex items-center gap-2 ml-auto">
            <Cart onClick={() => navigate("/Cart")} />
            <Profile />
          </div>
        </div>
        <hr className=" border-neutral-200 mx-9" />
      </header>
    </>
  );
}

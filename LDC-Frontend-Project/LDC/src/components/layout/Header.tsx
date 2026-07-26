import { useNavigate } from "react-router-dom";
import Search from "../ui/Search";
import Logo from "../Logo";
import Cart from "../Header/Cart";
import { useAppSelector } from "../../store/hooks";
import { selectCartCount } from "../../store/slices/cartslice";
import { selectIsAdmin } from "../../store/slices/authslice";
import Profile from "../Header/Profile";
export default function Header() {
  const navigate = useNavigate();
  const cartCount = useAppSelector(selectCartCount);
  const isAdmin = useAppSelector(selectIsAdmin);
  return (
    <>
      <header className="bg-white shadow ">
        <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-between gap-4">
          <Logo />
          <Search />
          <div className="flex items-center gap-2 ml-auto">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="rounded-lg px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Cart count={cartCount} onClick={() => navigate("/Cart")} />
                <Profile onClick={() => navigate("/profile")} />
              </>
            )}
          </div>
        </div>
        <hr className=" border-neutral-200 mx-9" />
      </header>
    </>
  );
}

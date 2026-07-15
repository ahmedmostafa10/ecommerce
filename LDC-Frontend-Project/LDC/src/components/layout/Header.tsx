import Search from "../ui/Search";
import Logo from "../Logo";
import Cart from "../Header/Cart";
import Profile from "../Header/profile";
export default function Header() {
  return (
    <>
      <header className="bg-white shadow ">
        <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 flex flex-row justify-between gap-4">
          <Logo />
          <Search />
          <div className="flex items-center gap-2 ml-auto">
            <Cart />
            <Profile />
          </div>
        </div>
        <hr className=" border-neutral-200 mx-9" />
      </header>
    </>
  );
}

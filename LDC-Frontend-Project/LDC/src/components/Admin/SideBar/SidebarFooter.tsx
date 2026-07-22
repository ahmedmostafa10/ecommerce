import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { footerItems } from "./Sidebar-items";

export default function FooterMenu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="mt-auto shrink-0 px-2 pb-4 sm:px-3">
      <ul className="flex flex-col gap-1">
        {footerItems.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.href}
              title={item.title}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                justify-center sm:justify-start
                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <item.icon size={20} className="shrink-0" />
              <span className="hidden sm:inline">{item.title}</span>
            </NavLink>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:justify-start"
          >
            <LogOut size={20} className="shrink-0" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

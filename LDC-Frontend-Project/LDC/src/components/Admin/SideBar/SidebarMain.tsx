import { NavLink } from "react-router-dom";
import { mainItems } from "./Sidebar-items";

export default function SidebarMain() {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {mainItems.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.href}
              title={item.title}
              className={({ isActive }) =>
                `group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                justify-center sm:justify-between
                ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <span className="relative flex items-center gap-3">
                <item.icon size={20} className="shrink-0" />
                <span className="hidden sm:inline">{item.title}</span>

                {item.badge && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white sm:hidden">
                    {item.badge}
                  </span>
                )}
              </span>

              {item.badge && (
                <span className="hidden h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white sm:flex">
                  {item.badge}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

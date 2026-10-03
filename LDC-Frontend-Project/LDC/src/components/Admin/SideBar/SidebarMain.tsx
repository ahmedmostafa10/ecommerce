import { NavLink } from "react-router-dom";
import { mainItems } from "./Sidebar-items";
import { useSidebarBadges, type BadgeKey } from "./useSidebarBadges";

export default function SidebarMain() {
  const badges = useSidebarBadges();

  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {mainItems.map((item) => {
          const count = item.badgeKey ? badges[item.badgeKey as BadgeKey] : 0;
          const showBadge = count > 0;
          const badgeLabel = count > 99 ? "99+" : String(count);

          return (
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

                  {showBadge && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white sm:hidden">
                      {badgeLabel}
                    </span>
                  )}
                </span>

                {showBadge && (
                  <span className="hidden h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white sm:flex">
                    {badgeLabel}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

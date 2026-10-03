import SidebarLogo from "./SidebarLogo";
import SidebarMain from "./SidebarMain";
import FooterMenu from "./SidebarFooter";

export default function AdminSidebar() {
  return (
    <aside className="flex h-svh w-[72px] shrink-0 flex-col border-r border-slate-200 bg-white sm:w-64">
      <SidebarLogo />

      <div className="flex-1 overflow-y-auto px-2 sm:px-3">
        <SidebarMain />
      </div>

      <FooterMenu />
    </aside>
  );
}

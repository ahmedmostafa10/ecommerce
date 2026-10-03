import AdminSidebar from "../Admin/SideBar/AdminSidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-svh bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}

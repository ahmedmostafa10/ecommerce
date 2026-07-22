import AdminLayout from "../../components/layout/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-500">Welcome back, Admin 👋</p>
      </div>
    </AdminLayout>
  );
}

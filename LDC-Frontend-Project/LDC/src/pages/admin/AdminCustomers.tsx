import AdminLayout from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/Admin/Customers/CustomerTable";

export default function AdminCustomers() {
  return (
    <AdminLayout>
      <CustomerTable />
    </AdminLayout>
  );
}

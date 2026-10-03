import { useState, useMemo } from "react";
import DataTable, { type Column } from "../../ui/DataTable";
import DateFilter from "../../ui/DateFilter";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { useToast } from "../../ui/ToastProvider";
import { emptyRange, inDateRange } from "../../ui/filtering";
import OrderRow from "./OrderRow";
import { useOrders, type Order } from "./useOrders";
import { deleteOrder } from "../../../services/orders";

const COLUMNS: Column<Order>[] = [
  { header: "Order ID", sortValue: (o) => o.orderNumber },
  { header: "Customer", sortValue: (o) => o.customerName },
  { header: "Items", sortValue: (o) => o.itemsCount },
  { header: "Total Price", sortValue: (o) => o.totalAmount },
  { header: "Date", sortValue: (o) => o.createdAt },
  { header: "Action" },
];

export default function OrderTable() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(emptyRange);

  const toast = useToast();
  const { orders, loading, error, refetch } = useOrders();

  const [pendingDelete, setPendingDelete] = useState<Order | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (!q ||
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)) &&
        inDateRange(o.date, range),
    );
  }, [orders, search, range]);

  async function handleConfirmDelete() {
    if (!pendingDelete) return;

    setDeleting(true);
    try {
      await deleteOrder(pendingDelete.id);
      toast({ message: "Order deleted", description: pendingDelete.orderNumber });
      setPendingDelete(null);
      await refetch();
    } catch (err) {
      toast({
        message: "Could not delete order",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "error",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <DataTable<Order>
        title="Orders"
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Orders List" },
        ]}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search order. . ."
        toolbar={<DateFilter value={range} onChange={setRange} />}
        columns={COLUMNS}
        rows={filtered}
        rowKey={(order) => order.id}
        renderRow={(order, isSelected, toggle) => (
          <OrderRow
            order={order}
            selected={isSelected}
            onToggle={toggle}
            onDelete={(o) => setPendingDelete(o)}
          />
        )}
        emptyMessage="No orders found."
        loading={loading}
        error={error}
        selectAllLabel="Select all orders"
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete order"
        message={`Order ${pendingDelete?.orderNumber} will be removed. This can't be undone from here.`}
        confirmLabel="Delete"
        destructive
        busy={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}

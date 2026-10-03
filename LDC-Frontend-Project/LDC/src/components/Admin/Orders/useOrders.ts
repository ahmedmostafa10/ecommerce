import { useCallback, useEffect, useState } from "react";
import { getOrders, type OrderResponse } from "../../../services/orders";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  date: string;
  createdAt: number;
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function toOrder(response: OrderResponse): Order {
  const items = response.orderItems ?? [];

  return {
    id: response.id,
    orderNumber: `#${response.id.slice(0, 8).toUpperCase()}`,
    customerName: response.fullName || response.customerName || "—",
    customerEmail: response.customerEmail ?? "",
    itemsCount: items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: response.totalAmount,
    date: formatDate(response.createdOn),
    createdAt: Date.parse(response.createdOn) || 0,
  };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getOrders(1, 100);
      setOrders(response.filter((o) => !o.isDeleted).map(toOrder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { orders, loading, error, refetch };
}

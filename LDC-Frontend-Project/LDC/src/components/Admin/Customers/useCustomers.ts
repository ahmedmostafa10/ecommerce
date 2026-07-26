import { useCallback, useEffect, useState } from "react";
import { getCustomers, type CustomerResponse } from "../../../services/customers";

export type CustomerStatus = "Active" | "InActive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  balance: number;
  status: CustomerStatus;
  created: string;
  createdAt: number;
  isAdmin: boolean;
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

export function toCustomer(response: CustomerResponse): Customer {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    phone: response.phone,
    orders: response.ordersCount ?? 0,
    balance: response.totalSpent ?? 0,
    status: response.status === "Active" ? "Active" : "InActive",
    created: formatDate(response.createdOn),
    createdAt: Date.parse(response.createdOn) || 0,
    isAdmin: response.isAdmin,
  };
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCustomers(1, 100);
      setCustomers(response.items.filter((c) => !c.isDeleted).map(toCustomer));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load customers.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { customers, loading, error, refetch };
}

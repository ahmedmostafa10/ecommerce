import api from "./api";
import type { ApiResponse } from "./auth";

export type DashboardSummary = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  averageOrderValue: number;
};

export type SalesPoint = {
  date: string;
  revenue: number;
  orders: number;
};

export type CategorySales = {
  type: string;
  revenue: number;
  unitsSold: number;
};

export type TopProduct = {
  id: string;
  name: string;
  type: string | null;
  unitsSold: number;
  revenue: number;
  imageUrl: string | null;
};

export type LowStockProduct = {
  id: string;
  name: string;
  type: string | null;
  stockQuantity: number;
  imageUrl: string | null;
};

export type DashboardOverview = {
  summary: DashboardSummary;
  salesOverTime: SalesPoint[];
  salesByCategory: CategorySales[];
  topProducts: TopProduct[];
  lowStock: LowStockProduct[];
};

export async function getDashboardOverview(params?: {
  salesDays?: number;
  topCount?: number;
  lowStockThreshold?: number;
  lowStockCount?: number;
}): Promise<DashboardOverview> {
  const { data } = await api.get<ApiResponse<DashboardOverview>>("/Dashboard", {
    params,
  });
  return data.data;
}

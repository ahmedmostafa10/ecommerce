import api from "./api";
import type { ApiResponse } from "./auth";

export type CreateOrderRequest = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  orderItems: { productId: string; quantity: number }[];
};

export type OrderItemResponse = {
  id: string;
  productId: string;
  quantity: number;
  cost: number;
};

export type OrderResponse = {
  id: string;
  customerId: string;
  customerName?: string | null;
  customerEmail?: string | null;
  amount: number;
  tax: number;
  totalAmount: number;
  fullName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  notes?: string | null;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  orderItems: OrderItemResponse[];
};

export async function createOrder(
  payload: CreateOrderRequest,
): Promise<OrderResponse> {
  const { data } = await api.post<ApiResponse<OrderResponse>>(
    "/Order",
    payload,
  );
  return data.data;
}

export async function getOrders(
  pageNumber = 1,
  pageSize = 100,
): Promise<OrderResponse[]> {
  const { data } = await api.get<ApiResponse<OrderResponse[]>>("/Order", {
    params: { pageNumber, pageSize },
  });
  return data.data ?? [];
}

export async function deleteOrder(id: string): Promise<void> {
  await api.delete(`/Order/${id}`);
}

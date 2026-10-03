import api from "./api";
import type { ApiResponse } from "./auth";

export type CustomerResponse = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  isAdmin: boolean;
  isDeleted: boolean;
  ordersCount: number;
  totalSpent: number;
  createdOn: string;
  updatedOn: string;
};

export type PagedCustomers = {
  items: CustomerResponse[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export async function getCustomers(
  pageNumber = 1,
  pageSize = 100,
): Promise<PagedCustomers> {
  const { data } = await api.get<ApiResponse<PagedCustomers>>("/Customer", {
    params: { pageNumber, pageSize },
  });
  const paged = data.data;
  return {
    items: paged?.items ?? [],
    totalCount: paged?.totalCount ?? 0,
    pageNumber: paged?.pageNumber ?? pageNumber,
    pageSize: paged?.pageSize ?? pageSize,
    totalPages: paged?.totalPages ?? 0,
  };
}

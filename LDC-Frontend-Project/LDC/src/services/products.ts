import api from "./api";
import type { ApiResponse } from "./auth";

export type ProductRequest = {
  name: string;
  description: string;
  amount: number;
  type: string;
  stockQuantity: number;
  status: "InStock" | "OutOfStock";
  sku?: string;
  discountType?: string;
  discountPercentage: number;
  taxClass?: string;
  vatAmount: number;
  isPhysical: boolean;
  weight?: string;
  height?: string;
  length?: string;
  width?: string;
  productImages: { url: string }[];
};

export type Category = {
  type: string;
  count: number;
  sampleImageUrl: string | null;
};

export type Categories = Category[];

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: string;
  stockQuantity: number;
  status: string;
  isDeleted: boolean;
  createdOn: string;
  updatedOn: string;
  productImages: { productImageId: string; url: string }[];
};

export async function createProduct(
  payload: ProductRequest,
): Promise<ApiResponse<ProductResponse>> {
  const { data } = await api.post<ApiResponse<ProductResponse>>(
    "/Product",
    payload,
  );
  return data;
}

export async function updateProduct(
  id: string,
  payload: ProductRequest,
): Promise<ApiResponse<ProductResponse>> {
  const { data } = await api.put<ApiResponse<ProductResponse>>(
    `/Product/${id}`,
    payload,
  );
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/Product/${id}`);
}

export async function getProducts(
  pageNumber = 1,
  pageSize = 10,
  type?: string,
): Promise<ProductResponse[]> {
  const { data } = await api.get<ApiResponse<ProductResponse[]>>("/Product", {
    params: { pageNumber, pageSize, ...(type ? { type } : {}) },
  });
  return data.data ?? [];
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const { data } = await api.get<ApiResponse<ProductResponse>>(
    `/Product/${id}`,
  );
  return data.data;
}

export async function getCategories(): Promise<Categories> {
  const { data } = await api.get<ApiResponse<Categories>>(
    "/Product/categories",
  );
  return data.data ?? [];
}

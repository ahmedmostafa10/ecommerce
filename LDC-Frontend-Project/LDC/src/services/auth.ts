import api from "./api";

export interface RegisterRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  password: string;
}

export interface User {
  id: string;
  isAdmin: boolean;
  createdOn: string;
  updatedOn: string;
  isDeleted: boolean;
  token: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export async function register(
  payload: Omit<RegisterRequest, "status">,
): Promise<ApiResponse<User>> {
  const { data } = await api.post<ApiResponse<User>>("/Customer/register", {
    ...payload,
    status: "Active",
  });
  return data;
}

export async function login(payload: LoginRequest): Promise<ApiResponse<User>> {
  const { data } = await api.post<ApiResponse<User>>(
    "/Customer/login",
    payload,
  );
  return data;
}

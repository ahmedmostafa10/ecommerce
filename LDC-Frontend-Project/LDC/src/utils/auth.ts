import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat: number;
  sub?: string;
}

export function isTokenExpired(token: string) {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function getToken(): string | null {
  const raw = localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return raw;
  }
}

export function hasValidSession(): boolean {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export function clearToken() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}

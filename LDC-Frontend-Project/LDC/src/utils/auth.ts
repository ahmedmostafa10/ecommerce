import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  iat: number;
  sub?: string;
}

export function isTokenExpired(token: string) {
  const decoded: JwtPayload = jwtDecode(token);

  return decoded.exp * 1000 < Date.now();
}

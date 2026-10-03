import { Navigate, Outlet } from "react-router-dom";
import { hasValidSession } from "../utils/auth";
import { useAppSelector } from "../store/hooks";
import { selectIsAdmin } from "../store/slices/authslice";

export default function CustomerRoute() {
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!hasValidSession()) return <Navigate to="/login" replace />;
  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

  return <Outlet />;
}

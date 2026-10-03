import { Navigate, Outlet } from "react-router-dom";
import { hasValidSession } from "../utils/auth";
import { useAppSelector } from "../store/hooks";
import { selectIsAdmin } from "../store/slices/authslice";

export default function AdminRoute() {
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!hasValidSession()) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/Home" replace />;

  return <Outlet />;
}

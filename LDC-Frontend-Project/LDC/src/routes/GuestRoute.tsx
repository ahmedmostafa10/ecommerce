import { Navigate, Outlet } from "react-router-dom";
import { hasValidSession } from "../utils/auth";
import { useAppSelector } from "../store/hooks";
import { selectIsAdmin } from "../store/slices/authslice";

export default function GuestRoute() {
  const isAdmin = useAppSelector(selectIsAdmin);

  if (hasValidSession()) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/Home"} replace />;
  }

  return <Outlet />;
}

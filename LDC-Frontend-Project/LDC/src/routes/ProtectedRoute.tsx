import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { clearToken, hasValidSession } from "../utils/auth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authslice";

export default function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const valid = hasValidSession();

  useEffect(() => {
    if (!valid) {
      clearToken();
      dispatch(logout());
    }
  }, [valid, dispatch]);

  if (!valid) return <Navigate to="/login" replace />;

  return <Outlet />;
}

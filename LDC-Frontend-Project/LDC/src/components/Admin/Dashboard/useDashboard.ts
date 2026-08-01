import { useCallback, useEffect, useState } from "react";
import {
  getDashboardOverview,
  type DashboardOverview,
} from "../../../services/dashboard";

export function useDashboard() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const overview = await getDashboardOverview({ salesDays: 30 });
      setData(overview);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

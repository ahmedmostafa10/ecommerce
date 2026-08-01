import { useEffect, useState } from "react";
import { getDashboardOverview } from "../../../services/dashboard";

export type BadgeKey = "orders";

export function useSidebarBadges() {
  const [badges, setBadges] = useState<Record<BadgeKey, number>>({ orders: 0 });

  useEffect(() => {
    let active = true;

    getDashboardOverview({ salesDays: 7 })
      .then((data) => {
        if (!active) return;
        const recentOrders = data.salesOverTime.reduce(
          (sum, point) => sum + point.orders,
          0,
        );
        setBadges({ orders: recentOrders });
      })
      .catch((error) => {
        console.error(
          "Failed to fetch dashboard overview for sidebar badges.",
          error,
        );
      });

    return () => {
      active = false;
    };
  }, []);

  return badges;
}

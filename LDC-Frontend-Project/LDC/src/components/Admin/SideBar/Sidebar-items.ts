import {
  LayoutDashboard,
  Package2,
  ShoppingCart,
  Users,
  LifeBuoy,
  Settings,
} from "lucide-react";

export const mainItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product List",
    href: "/admin/products",
    icon: Package2,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: 2,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

export const footerItems = [
  {
    title: "Support",
    href: "/admin/support",
    icon: LifeBuoy,
  },
  {
    title: "Setting",
    href: "/admin/settings",
    icon: Settings,
  },
];

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { useDashboard } from "./useDashboard";
import SalesLineChart from "./SalesLineChart";
import CategoryDonut from "./CategoryDonut";
import type {
  LowStockProduct,
  TopProduct,
} from "../../../services/dashboard";

function formatMoney(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string;
  icon: typeof DollarSign;
  tint: string;
}) {
  return (
    <Card className="flex items-center gap-4">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}
      >
        <Icon size={22} />
      </span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );
}

function ProductThumb({ url, name }: { url: string | null; name: string }) {
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="h-10 w-10 rounded-lg object-cover"
      />
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
      <Package size={16} />
    </span>
  );
}

function TopProductsList({ items }: { items: TopProduct[] }) {
  if (items.length === 0)
    return <p className="text-sm text-gray-400">No sales yet.</p>;
  return (
    <ul className="space-y-3">
      {items.map((p) => (
        <li key={p.id} className="flex items-center gap-3">
          <ProductThumb url={p.imageUrl} name={p.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-800">
              {p.name}
            </p>
            <p className="text-xs text-gray-400">{p.type ?? "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {p.unitsSold} sold
            </p>
            <p className="text-xs text-gray-400">{formatMoney(p.revenue)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function LowStockList({ items }: { items: LowStockProduct[] }) {
  if (items.length === 0)
    return <p className="text-sm text-gray-400">Everything is well stocked.</p>;
  return (
    <ul className="space-y-3">
      {items.map((p) => {
        const critical = p.stockQuantity <= 3;
        return (
          <li key={p.id} className="flex items-center gap-3">
            <ProductThumb url={p.imageUrl} name={p.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {p.name}
              </p>
              <p className="text-xs text-gray-400">{p.type ?? "—"}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                critical
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {p.stockQuantity} left
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function DashboardView() {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
        <div className="mt-4 h-72 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error ?? "Something went wrong."}</p>
          <button
            onClick={() => void refetch()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { summary, salesOverTime, salesByCategory, topProducts, lowStock } =
    data;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back, Admin 👋</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatMoney(summary.totalRevenue)}
          icon={DollarSign}
          tint="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          label="Orders"
          value={summary.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          tint="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Customers"
          value={summary.totalCustomers.toLocaleString()}
          icon={Users}
          tint="bg-sky-50 text-sky-600"
        />
        <StatCard
          label="Products"
          value={summary.totalProducts.toLocaleString()}
          icon={Package}
          tint="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Sales Overview</h2>
              <p className="text-xs text-gray-400">Revenue, last 30 days</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-indigo-600">
              <TrendingUp size={14} /> Avg order {formatMoney(summary.averageOrderValue)}
            </span>
          </div>
          <SalesLineChart data={salesOverTime} />
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold text-gray-900">Sales by Category</h2>
          <CategoryDonut data={salesByCategory} />
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold text-gray-900">Top Products</h2>
          <TopProductsList items={topProducts} />
        </Card>

        <Card>
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
            <AlertTriangle size={16} className="text-amber-500" /> Low Stock
            Alerts
          </h2>
          <LowStockList items={lowStock} />
        </Card>
      </div>
    </div>
  );
}

import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Order } from "./useOrders";

type OrderRowProps = {
  order: Order;
  selected: boolean;
  onToggle: (id: string) => void;
  onView?: (order: Order) => void;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
};

export default function OrderRow({
  order,
  selected,
  onToggle,
  onView,
  onEdit,
  onDelete,
}: OrderRowProps) {
  return (
    <tr className="group border-b border-[#E0E2E7] bg-white transition-colors hover:bg-violet-50/30">
      {/* Checkbox */}
      <td className="w-12 py-3.5 pl-5 pr-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(order.id)}
          className="h-4 w-4 rounded border-gray-300 text-violet-500 focus:ring-violet-400 cursor-pointer accent-violet-500"
        />
      </td>

      {/* Order Number */}
      <td className="py-3.5 pr-4">
        <span className="text-sm font-semibold text-violet-600 hover:underline cursor-pointer">
          {order.orderNumber}
        </span>
      </td>

      {/* Customer */}
      <td className="py-3.5 pr-4">
        <div>
          <p className="text-sm font-medium text-gray-800 leading-tight">
            {order.customerName}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{order.customerEmail}</p>
        </div>
      </td>

      {/* Items */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-600">
          {order.itemsCount} Item{order.itemsCount > 1 ? "s" : ""}
        </span>
      </td>

      {/* Total Amount */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-800 font-semibold">
          ${order.totalAmount.toFixed(2)}
        </span>
      </td>

      {/* Date */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {order.date}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 pl-2">
        <div className="flex items-center justify-start gap-1">
          <button
            type="button"
            onClick={() => onDelete?.(order)}
            aria-label={`Delete order ${order.orderNumber}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

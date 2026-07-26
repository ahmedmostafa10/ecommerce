import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Customer } from "./useCustomers";

type CustomerRowProps = {
  customer: Customer;
  selected: boolean;
  onToggle: (id: string) => void;
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
};

export default function CustomerRow({
  customer,
  selected,
  onToggle,
  onView,
  onEdit,
  onDelete,
}: CustomerRowProps) {
  return (
    <tr className="group border-b border-[#E0E2E7] bg-white transition-colors hover:bg-violet-50/30">
      {/* Checkbox */}
      <td className="w-12 py-3.5 pl-5 pr-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(customer.id)}
          className="h-4 w-4 rounded border-gray-300 text-violet-500 focus:ring-violet-400 cursor-pointer accent-violet-500"
        />
      </td>

      {/* Customer Name & Email */}
      <td className="py-3.5 pr-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {customer.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{customer.email}</p>
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-600 font-medium">
          {customer.phone}
        </span>
      </td>

      {/* Orders */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-600">
          {customer.orders.toLocaleString()}
        </span>
      </td>

      {/* Balance */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-600 font-medium">
          ${customer.balance.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td className="py-3.5 pr-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            customer.status === "Active"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {customer.status}
        </span>
      </td>

      {/* Created */}
      <td className="py-3.5 pr-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {customer.created}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 pr-5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView?.(customer)}
            aria-label={`View ${customer.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(customer)}
            aria-label={`Edit ${customer.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(customer)}
            aria-label={`Delete ${customer.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

import { Eye, Pencil, Trash2 } from "lucide-react";
import ImagePlaceholderIcon from "../../../assets/icons/ImagePlaceholderIcon";

export type ProductStatus = "Published" | "Low Stock" | "Out of Stock" | "Draft";

export type Product = {
  id: string;
  name: string;
  variants: number;
  image?: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  added: string;
};

type ProductRowProps = {
  product: Product;
  selected: boolean;
  onToggle: (id: string) => void;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
};

const statusStyles: Record<ProductStatus, string> = {
  Published:
    "bg-emerald-50 text-emerald-600",
  "Low Stock":
    "bg-amber-50 text-amber-600",
  "Out of Stock":
    "bg-red-50 text-red-500",
  Draft:
    "bg-slate-100 text-slate-500",
};

export default function ProductRow({
  product,
  selected,
  onToggle,
  onView,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <tr className="group border-b border-gray-100 transition-colors hover:bg-violet-50/30">
      {/* Checkbox */}
      <td className="w-12 py-3 pl-5 pr-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(product.id)}
          className="h-4 w-4 rounded border-gray-300 text-violet-500 focus:ring-violet-400 cursor-pointer accent-violet-500"
        />
      </td>

      {/* Product info */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                <ImagePlaceholderIcon className="h-5 w-5" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {product.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {product.variants} Variant{product.variants !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="py-3 pr-4">
        <span className="text-sm font-medium text-violet-500">
          {product.sku}
        </span>
      </td>

      {/* Category */}
      <td className="py-3 pr-4">
        <span className="text-sm text-gray-600">{product.category}</span>
      </td>

      {/* Stock */}
      <td className="py-3 pr-4">
        <span className="text-sm text-gray-600">{product.stock}</span>
      </td>

      {/* Price */}
      <td className="py-3 pr-4">
        <span className="text-sm text-gray-600">
          ${product.price.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td className="py-3 pr-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyles[product.status]}`}
        >
          {product.status}
        </span>
      </td>

      {/* Added */}
      <td className="py-3 pr-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">{product.added}</span>
      </td>

      {/* Actions */}
      <td className="py-3 pr-5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onView?.(product)}
            aria-label={`View ${product.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            onClick={() => onEdit?.(product)}
            aria-label={`Edit ${product.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(product)}
            aria-label={`Delete ${product.name}`}
            className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

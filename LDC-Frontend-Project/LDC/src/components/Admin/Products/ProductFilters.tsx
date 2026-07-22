import { SlidersHorizontal } from "lucide-react";
import Dropdown from "../../ui/Dropdown";
import type { ProductStatus } from "./ProductRow";
import {
  ALL_STATUSES,
  emptyFilters,
  toggle,
  type Filters,
} from "./productFiltering";

type Props = {
  value: Filters;
  categories: string[];
  onChange: (filters: Filters) => void;
};

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-violet-500"
      />
      {label}
    </label>
  );
}

export default function ProductFilters({ value, categories, onChange }: Props) {
  const count = value.categories.length + value.statuses.length;

  return (
    <Dropdown
      trigger={
        <>
          <SlidersHorizontal size={15} />
          Filters
        </>
      }
      badge={count}
    >
      {(close) => (
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Status
            </p>
            {ALL_STATUSES.map((status: ProductStatus) => (
              <CheckItem
                key={status}
                label={status}
                checked={value.statuses.includes(status)}
                onChange={() =>
                  onChange({
                    ...value,
                    statuses: toggle(value.statuses, status),
                  })
                }
              />
            ))}
          </div>

          <div className="max-h-44 overflow-y-auto">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Category
            </p>
            {categories.map((category) => (
              <CheckItem
                key={category}
                label={category}
                checked={value.categories.includes(category)}
                onChange={() =>
                  onChange({
                    ...value,
                    categories: toggle(value.categories, category),
                  })
                }
              />
            ))}
          </div>

          <div className="flex justify-between border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={() => onChange(emptyFilters)}
              disabled={count === 0}
              className="text-sm font-medium text-gray-500 transition hover:text-gray-700 disabled:opacity-40"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-lg bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Dropdown>
  );
}

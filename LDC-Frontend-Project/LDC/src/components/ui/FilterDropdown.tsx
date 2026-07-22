import { SlidersHorizontal } from "lucide-react";
import Dropdown from "./Dropdown";

export type FilterGroup = {
  /** Key used with useFilters (`selected`, `matches`, `toggleFilter`). */
  key: string;
  label: string;
  options: readonly string[];
  selected: readonly string[];
};

type Props = {
  groups: FilterGroup[];
  onToggle: (group: string, option: string) => void;
  onClear: () => void;
  activeCount: number;
};

export default function FilterDropdown({
  groups,
  onToggle,
  onClear,
  activeCount,
}: Props) {
  return (
    <Dropdown
      trigger={
        <>
          <SlidersHorizontal size={15} />
          Filters
        </>
      }
      badge={activeCount}
    >
      {(close) => (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.key} className="max-h-44 overflow-y-auto">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {group.label}
              </p>
              {group.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 py-1 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={group.selected.includes(option)}
                    onChange={() => onToggle(group.key, option)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-violet-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}

          <div className="flex justify-between border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={onClear}
              disabled={activeCount === 0}
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

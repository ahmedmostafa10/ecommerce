import { Calendar } from "lucide-react";
import Dropdown from "./Dropdown";
import { emptyRange, isRangeActive, type DateRange } from "./filtering";

type Props = {
  value: DateRange;
  onChange: (range: DateRange) => void;
  label?: string;
};

const field =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

export default function DateFilter({
  value,
  onChange,
  label = "Select Dates",
}: Props) {
  const active = isRangeActive(value);

  return (
    <Dropdown
      trigger={
        <>
          <Calendar size={15} />
          {label}
        </>
      }
      badge={active ? 1 : 0}
    >
      {(close) => (
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-500">
              From
            </span>
            <input
              type="date"
              value={value.from}
              max={value.to || undefined}
              onChange={(e) => onChange({ ...value, from: e.target.value })}
              className={field}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-500">
              To
            </span>
            <input
              type="date"
              value={value.to}
              min={value.from || undefined}
              onChange={(e) => onChange({ ...value, to: e.target.value })}
              className={field}
            />
          </label>

          <div className="flex justify-between pt-1">
            <button
              type="button"
              onClick={() => onChange(emptyRange)}
              disabled={!active}
              className="text-sm font-medium text-gray-500 transition hover:text-gray-700 disabled:opacity-40"
            >
              Clear
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

import { useState } from "react";
import Button from "./Button";

type FilterProps = {
  min?: number;
  max?: number;
  step?: number;
  initial?: [number, number];
  onApply?: (value: [number, number]) => void;
  className?: string;
};

const thumb =
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-indigo-500";

export default function Filter({
  min = 0,
  max = 500,
  step = 1,
  initial = [50, 200],
  onApply,
  className = "",
}: FilterProps) {
  const [value, setValue] = useState<[number, number]>(initial);
  const [open, setOpen] = useState(true);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue([Math.min(Number(e.target.value), value[1] - step), value[1]]);

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue([value[0], Math.max(Number(e.target.value), value[0] + step)]);

  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--brand)]">Filters</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-400"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      </div>

      <hr className="my-4 border-gray-200" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-base font-bold text-[var(--brand)]">Price</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 text-gray-600 transition-transform ${open ? "" : "rotate-180"}`}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {open && (
        <div className="mt-4">
          <div className="relative h-5">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-indigo-500"
              style={{
                left: `${percent(value[0])}%`,
                right: `${100 - percent(value[1])}%`,
              }}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[0]}
              onChange={handleMin}
              aria-label="Minimum price"
              className={`pointer-events-none absolute top-0 h-5 w-full appearance-none bg-transparent ${thumb}`}
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value[1]}
              onChange={handleMax}
              aria-label="Maximum price"
              className={`pointer-events-none absolute top-0 h-5 w-full appearance-none bg-transparent ${thumb}`}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
            <span>${value[0]}</span>
            <span>${value[1]}</span>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          className="rounded-full!"
          onClick={() => onApply?.(value)}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./CustomButton";
import FilterIcon from "../../assets/icons/FilterIcon";
import ChevronUpIcon from "../../assets/icons/ChevronUpIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

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
  initial = [50, 1000],
  onApply,
  className = "",
}: FilterProps) {
  const [value, setValue] = useState<[number, number]>(initial);
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue([Math.min(Number(e.target.value), value[1] - step), value[1]]);

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue([value[0], Math.max(Number(e.target.value), value[0] + step)]);

  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  const handleApply = () => {
    onApply?.(value);
    setMobileOpen(false);
  };

  const filterBody = (
    <>
      <hr className="my-4 border-gray-200" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-base font-bold text-[var(--brand)]">Price</span>
        <ChevronUpIcon
          className={`h-4 w-4 text-gray-600 transition-transform ${open ? "" : "rotate-180"}`}
        />
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
        <Button type="submit" className="rounded-full!" onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </>
  );

  const mobileSheet =
    mobileOpen &&
    createPortal(
      <>
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close filters"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
          className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-gray-200 bg-white p-5 shadow-lg lg:hidden"
        >
          <div className="flex items-center justify-between">
            <h2
              id="mobile-filter-title"
              className="text-lg font-bold text-[var(--brand)]"
            >
              Filters
            </h2>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close filters"
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          {filterBody}
        </div>
      </>,
      document.body,
    );

  return (
    <>
      <div
        className={`flex items-center justify-between lg:hidden ${className}`}
      >
        <h2 className="text-lg font-bold text-[var(--brand)]">Filters</h2>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open filters"
          aria-expanded={mobileOpen}
          className="rounded-full p-1 transition hover:bg-gray-100"
        >
          <FilterIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {mobileSheet}

      <div
        className={`hidden w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:block ${className}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--brand)]">Filters</h2>
          <FilterIcon className="h-5 w-5 text-gray-400" />
        </div>
        {filterBody}
      </div>
    </>
  );
}

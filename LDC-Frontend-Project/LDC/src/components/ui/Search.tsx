import { useState, type InputHTMLAttributes } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: "pill" | "field";
  collapsible?: boolean;
  className?: string;
};

const INPUT_STYLES = {
  pill: "rounded-full border-gray-300 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-200",
  field:
    "rounded-lg border-gray-200 bg-white focus:border-violet-400 focus:ring-violet-100",
} as const;

export default function Search({
  label,
  id = "search-input",
  placeholder = "Search...",
  variant = "pill",
  collapsible = true,
  className = "",
  ...props
}: SearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex w-full items-center justify-end sm:w-auto sm:flex-1 ${className}`}
    >
      {collapsible && (
        <button
          type="button"
          aria-label="Open search"
          onClick={() => setOpen(true)}
          className={`${open ? "hidden" : "inline-flex"} items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 sm:hidden`}
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      )}

      <div
        className={`${!collapsible || open ? "flex" : "hidden"} w-full flex-col gap-2 sm:flex`}
      >
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-(--neutral-600)"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            id={id}
            type="search"
            placeholder={placeholder}
            autoFocus={collapsible && open}
            onBlur={collapsible ? () => setOpen(false) : undefined}
            className={`w-full border py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 ${INPUT_STYLES[variant]}`}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

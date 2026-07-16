import { useState, type InputHTMLAttributes } from "react";

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default function Search({
  label,
  id = "search-input",
  placeholder = "Search...",
  ...props
}: SearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-end sm:w-auto sm:flex-1">
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className={`${open ? "hidden" : "inline-flex"} items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 sm:hidden`}
      >
        <SearchIcon className="h-6 w-6" />
      </button>

      <div
        className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 sm:flex`}
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
            autoFocus={open}
            onBlur={() => setOpen(false)}
            className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

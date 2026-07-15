import type { ButtonHTMLAttributes } from "react";

type CartProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  count?: number;
};

export default function Cart({ count = 0, className = "", ...props }: CartProps) {
  return (
    <button
      type="button"
      aria-label="Cart"
      className={`relative inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 ${className}`}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

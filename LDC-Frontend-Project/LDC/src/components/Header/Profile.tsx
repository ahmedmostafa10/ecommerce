import type { ButtonHTMLAttributes } from "react";

type ProfileProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Profile({ className = "", ...props }: ProfileProps) {
  return (
    <button
      type="button"
      aria-label="Profile"
      className={`inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 ${className}`}
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
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </button>
  );
}

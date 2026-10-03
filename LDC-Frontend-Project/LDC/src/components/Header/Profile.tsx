import type { ButtonHTMLAttributes } from "react";
import UserIcon from "../../assets/icons/UserIcon";

type ProfileProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Profile({ className = "", ...props }: ProfileProps) {
  return (
    <button
      type="button"
      aria-label="Profile"
      className={`inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition hover:bg-gray-100 hover:text-indigo-600 ${className}`}
      {...props}
    >
      <UserIcon className="h-6 w-6" />
    </button>
  );
}

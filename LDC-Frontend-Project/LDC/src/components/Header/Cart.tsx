import type { ButtonHTMLAttributes } from "react";
import CartIcon from "../../assets/icons/CartIcon";

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
      <CartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

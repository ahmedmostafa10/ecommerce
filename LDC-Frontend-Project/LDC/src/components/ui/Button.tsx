import type { ButtonHTMLAttributes, ReactNode } from "react";

const VARIANTS = {
  primary:
    "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

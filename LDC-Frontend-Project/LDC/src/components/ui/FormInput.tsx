import type { InputHTMLAttributes } from "react";

export const FIELD_BASE =
  "w-full rounded-lg border border-gray-200 bg-gray-50/50 text-gray-800 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
  compact?: boolean;
};

export default function FormInput({
  prefix,
  compact = false,
  className = "",
  ...props
}: FormInputProps) {
  const size = compact
    ? "px-3 py-2.5 text-xs"
    : `${prefix ? "pl-8 pr-4" : "px-4"} py-3 text-sm`;

  const input = (
    <input className={`${FIELD_BASE} ${size} ${className}`} {...props} />
  );

  if (!prefix) return input;

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-400">
        {prefix}
      </span>
      {input}
    </div>
  );
}

import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Checkbox({ label, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-2 text-sm text-[var(--neutral-900)] font-medium"
    >
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
        {...props}
      />
      {label}
    </label>
  );
}

import type { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function InputField({
  label,
  id,
  type = "text",
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--neutral-600)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
        {...props}
      />
    </div>
  );
}

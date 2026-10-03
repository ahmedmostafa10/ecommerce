import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  compact?: boolean;
  children: ReactNode;
  className?: string;
};

export default function FormField({
  label,
  htmlFor,
  compact = false,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className={
          compact
            ? "text-xs font-medium text-gray-500"
            : "text-sm font-medium text-gray-600"
        }
      >
        {label}
      </label>
      {children}
    </div>
  );
}

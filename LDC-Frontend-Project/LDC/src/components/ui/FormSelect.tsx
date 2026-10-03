import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { FIELD_BASE } from "./FormInput";

type Option = { value: string; label: string };

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly Option[];
  placeholder?: string;
};

export default function FormSelect({
  options,
  placeholder,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div className="relative">
      <select
        className={`${FIELD_BASE} appearance-none px-4 py-3 text-sm ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

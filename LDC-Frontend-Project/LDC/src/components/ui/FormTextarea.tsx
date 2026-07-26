import type { TextareaHTMLAttributes } from "react";
import { FIELD_BASE } from "./FormInput";

export default function FormTextarea({
  className = "",
  rows = 6,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={`${FIELD_BASE} resize-none px-4 py-3 text-sm ${className}`}
      {...props}
    />
  );
}

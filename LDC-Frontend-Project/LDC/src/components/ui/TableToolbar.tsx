import type { ReactNode } from "react";
import Search from "./Search";

type TableToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Filter controls rendered on the right. */
  children?: ReactNode;
  className?: string;
};

export default function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
  className = "",
}: TableToolbarProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <Search
        variant="field"
        collapsible={false}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

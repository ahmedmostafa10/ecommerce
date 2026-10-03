import { useEffect, useRef, useState, type ReactNode } from "react";

type DropdownProps = {
  trigger: ReactNode;
  badge?: number;
  children: (close: () => void) => ReactNode;
  align?: "left" | "right";
};

export default function Dropdown({
  trigger,
  badge = 0,
  children,
  align = "right",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition ${
          badge > 0 || open
            ? "border-violet-300 text-violet-600"
            : "border-gray-200 text-gray-600 hover:bg-gray-50"
        }`}
      >
        {trigger}
        {badge > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          className={`absolute z-30 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

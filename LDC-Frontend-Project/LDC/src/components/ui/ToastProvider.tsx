import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Check, X, AlertCircle } from "lucide-react";

type ToastVariant = "success" | "error";

type Toast = {
  id: number;
  message: string;
  description?: string;
  variant: ToastVariant;
};

type ShowToast = (toast: {
  message: string;
  description?: string;
  variant?: ToastVariant;
}) => void;

const ToastContext = createContext<ShowToast | null>(null);

const AUTO_DISMISS_MS = 3000;

export function useToast(): ShowToast {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback<ShowToast>(
    ({ message, description, variant = "success" }) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [
        ...current,
        { id, message, description, variant },
      ]);
      window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
    },
    [dismiss],
  );
  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col gap-3"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              role="status"
              className="pointer-events-auto flex w-[320px] animate-[toast-in_200ms_ease-out] items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  toast.variant === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {toast.variant === "success" ? (
                  <Check size={14} />
                ) : (
                  <AlertCircle size={14} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--brand)]">
                  {toast.message}
                </p>
                {toast.description && (
                  <p className="mt-0.5 truncate text-xs text-neutral-500">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="shrink-0 rounded-full p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

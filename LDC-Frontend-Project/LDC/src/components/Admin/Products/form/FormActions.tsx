import { Check, Loader2, X } from "lucide-react";

type Props = {
  completion: number;
  submitting?: boolean;
  uploadProgress?: number | null;
  submitLabel?: string;
  onCancel: () => void;
};

export default function FormActions({
  completion,
  submitting = false,
  uploadProgress = null,
  submitLabel = "Save",
  onCancel,
}: Props) {
  const label =
    uploadProgress !== null
      ? `Uploading ${uploadProgress}%`
      : submitting
        ? "Saving..."
        : submitLabel;
  return (
    <div className="sticky bottom-0 z-40 mt-6 flex flex-col gap-3 border-t border-gray-100 bg-white/80 px-4 py-4 shadow-lg shadow-gray-100/50 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">
          Product Completion
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            completion === 100
              ? "bg-emerald-50 text-emerald-600"
              : "bg-violet-50 text-violet-600"
          }`}
        >
          {completion}%
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 active:scale-[.98] disabled:opacity-50 sm:flex-none"
        >
          <X size={15} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          {submitting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Check size={15} />
          )}
          {label}
        </button>
      </div>
    </div>
  );
}

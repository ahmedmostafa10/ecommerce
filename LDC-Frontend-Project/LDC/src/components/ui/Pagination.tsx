import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();

  if (currentPage > 1) pages.add(currentPage - 1);
  pages.add(currentPage);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }

  return result;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPaginationItems(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-between gap-4 ${className}`}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--brand)] transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Previous
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-neutral-400"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                isActive
                  ? "bg-neutral-100 text-[var(--brand)]"
                  : "text-neutral-400 hover:text-[var(--brand)]"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--brand)] transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}

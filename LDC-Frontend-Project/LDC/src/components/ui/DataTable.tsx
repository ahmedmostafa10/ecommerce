import { Fragment, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import BreadCrumb, { type BreadcrumbItem } from "../BreadCrumb";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";

export type Column<T> = {
  header: ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
};

type SortState = { index: number; dir: "asc" | "desc" };

type DataTableProps<T> = {
  title: string;
  breadcrumb: BreadcrumbItem[];
  action?: ReactNode;

  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  toolbar?: ReactNode;

  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  renderRow: (
    row: T,
    selected: boolean,
    toggle: (id: string) => void,
  ) => ReactNode;
  emptyMessage?: string;
  itemsPerPage?: number;
  minWidth?: number;
  selectAllLabel?: string;
};

function SortIcon({ dir }: { dir?: "asc" | "desc" }) {
  if (!dir) return <ChevronsUpDown size={14} className="text-gray-300" />;
  return dir === "asc" ? (
    <ChevronUp size={14} className="text-violet-600" />
  ) : (
    <ChevronDown size={14} className="text-violet-600" />
  );
}

export default function DataTable<T>({
  title,
  breadcrumb,
  action,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  toolbar,
  columns,
  rows,
  rowKey,
  renderRow,
  emptyMessage = "No results found.",
  itemsPerPage = 10,
  minWidth = 950,
  selectAllLabel = "Select all rows",
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortState | null>(null);

  function toggleSort(index: number) {
    setSort((prev) =>
      prev?.index === index
        ? { index, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { index, dir: "asc" },
    );
    setCurrentPage(1);
  }

  const sortedRows = useMemo(() => {
    const getValue = sort ? columns[sort.index]?.sortValue : undefined;
    if (!sort || !getValue) return rows;

    const factor = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = getValue(a);
      const bv = getValue(b);
      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * factor;
      }
      return String(av).localeCompare(String(bv)) * factor;
    });
  }, [rows, sort, columns]);

  const totalCount = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const page = Math.min(currentPage, totalPages);

  const startIdx = (page - 1) * itemsPerPage;
  const pageRows = sortedRows.slice(startIdx, startIdx + itemsPerPage);

  const allSelected =
    pageRows.length > 0 && pageRows.every((r) => selectedIds.has(rowKey(r)));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pageRows.forEach((r) => {
        if (allSelected) next.delete(rowKey(r));
        else next.add(rowKey(r));
      });
      return next;
    });
  }

  const showingStart = totalCount === 0 ? 0 : startIdx + 1;
  const showingEnd = Math.min(startIdx + itemsPerPage, totalCount);

  return (
    <div className="flex h-full flex-col bg-[#F0F1F3]">
      {/* Header */}
      <div className="flex flex-col gap-2 px-6 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <BreadCrumb items={breadcrumb} className="!px-0 !py-1" />
        </div>
        {action}
      </div>

      {/* Toolbar */}
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={(value) => {
          onSearchChange(value);
          setCurrentPage(1);
        }}
        searchPlaceholder={searchPlaceholder}
        className="px-6 py-4"
      >
        {toolbar}
      </TableToolbar>

      {/* Table section */}
      <section className="mx-6 mb-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E0E2E7] bg-white">
        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table
            className="w-full table-auto text-left"
            style={{ minWidth: `${minWidth}px` }}
          >
            <thead>
              <tr className="border-b border-[#E0E2E7] bg-[#F0F1F3] text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="w-12 py-3.5 pl-5 pr-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-violet-500"
                    aria-label={selectAllLabel}
                  />
                </th>
                {columns.map((col, i) => {
                  const active = sort?.index === i;
                  return (
                    <th
                      key={i}
                      aria-sort={
                        active
                          ? sort.dir === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                      className={`py-3.5 font-semibold ${
                        i === columns.length - 1 ? "pr-5" : "pr-4"
                      } ${col.className ?? ""}`}
                    >
                      {col.sortValue ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(i)}
                          className="inline-flex items-center gap-1 uppercase tracking-wider transition hover:text-gray-700"
                        >
                          {col.header}
                          <SortIcon dir={active ? sort.dir : undefined} />
                        </button>
                      ) : (
                        col.header
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="py-20 text-center text-sm text-gray-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => {
                  const id = rowKey(row);
                  return (
                    <Fragment key={id}>
                      {renderRow(row, selectedIds.has(id), toggleOne)}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E0E2E7] px-6 py-4 sm:flex-row">
          <p className="text-sm font-medium text-gray-400">
            Showing {showingStart}-{showingEnd} from {totalCount}
          </p>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}

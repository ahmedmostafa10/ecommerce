import { useCallback, useState } from "react";

export type DateRange = { from: string; to: string };

export const emptyRange: DateRange = { from: "", to: "" };

export function isRangeActive(range: DateRange): boolean {
  return Boolean(range.from || range.to);
}

/** Toggle a value in/out of an array (immutably). */
export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

/** Distinct, sorted values of one field — for building filter options. */
export function uniqueValues<T>(items: T[], get: (item: T) => string): string[] {
  return [...new Set(items.map(get))].sort();
}

/**
 * Whether a display date ("29 Dec 2022") falls inside the range.
 * Unparseable dates are excluded once a range is set, rather than
 * silently treated as epoch 0.
 */
export function inDateRange(value: string, range: DateRange): boolean {
  const from = range.from ? Date.parse(range.from) : null;
  // Include the whole end day.
  const to = range.to ? Date.parse(range.to) + 86_400_000 - 1 : null;

  if (from === null && to === null) return true;

  const time = Date.parse(value);
  if (Number.isNaN(time)) return false;
  if (from !== null && time < from) return false;
  if (to !== null && time > to) return false;
  return true;
}

/**
 * Multi-group checkbox filter state, keyed by group.
 * An empty group means "no constraint", so `matches` returns true.
 */
export function useFilters() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  function toggleFilter(group: string, option: string) {
    setFilters((prev) => ({
      ...prev,
      [group]: toggle(prev[group] ?? [], option),
    }));
  }

  function clearFilters() {
    setFilters({});
  }

  const selected = useCallback(
    (group: string): string[] => filters[group] ?? [],
    [filters],
  );

  // Stable across renders so callers can safely list it as a useMemo dep.
  const matches = useCallback(
    (group: string, value: string): boolean => {
      const chosen = filters[group];
      return !chosen || chosen.length === 0 || chosen.includes(value);
    },
    [filters],
  );

  const activeCount = Object.values(filters).reduce(
    (total, values) => total + values.length,
    0,
  );

  return { toggleFilter, clearFilters, selected, matches, activeCount };
}

import type { Product, ProductStatus } from "./ProductRow";

export type DateRange = { from: string; to: string };
export type Filters = { categories: string[]; statuses: ProductStatus[] };

export const emptyRange: DateRange = { from: "", to: "" };
export const emptyFilters: Filters = { categories: [], statuses: [] };

export const ALL_STATUSES: ProductStatus[] = [
  "Published",
  "Low Stock",
  "Out of Stock",
  "Draft",
];

export function parseAdded(added: string): number {
  const time = Date.parse(added);
  return Number.isNaN(time) ? NaN : time;
}

export function categoriesOf(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}

export function countActive(range: DateRange, filters: Filters): number {
  return (
    (range.from || range.to ? 1 : 0) +
    filters.categories.length +
    filters.statuses.length
  );
}
export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function filterProducts(
  products: Product[],
  search: string,
  range: DateRange,
  filters: Filters,
): Product[] {
  const q = search.trim().toLowerCase();
  const from = range.from ? Date.parse(range.from) : null;
  const to = range.to ? Date.parse(range.to) + 86_400_000 - 1 : null;

  return products.filter((p) => {
    if (
      q &&
      !p.name.toLowerCase().includes(q) &&
      !p.sku.toLowerCase().includes(q) &&
      !p.category.toLowerCase().includes(q)
    ) {
      return false;
    }

    if (filters.categories.length && !filters.categories.includes(p.category)) {
      return false;
    }

    if (filters.statuses.length && !filters.statuses.includes(p.status)) {
      return false;
    }

    if (from !== null || to !== null) {
      const added = parseAdded(p.added);
      if (Number.isNaN(added)) return false;
      if (from !== null && added < from) return false;
      if (to !== null && added > to) return false;
    }

    return true;
  });
}

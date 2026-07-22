import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import DataTable, { type Column } from "../../ui/DataTable";
import DateFilter from "../../ui/DateFilter";
import FilterDropdown from "../../ui/FilterDropdown";
import {
  emptyRange,
  inDateRange,
  uniqueValues,
  useFilters,
} from "../../ui/filtering";
import ProductRow from "./ProductRow";
import type { Product } from "./ProductRow";
import { adminProducts } from "../../../data/adminProducts";

const STATUSES = ["Published", "Low Stock", "Out of Stock", "Draft"];

const COLUMNS: Column<Product>[] = [
  { header: "Product", sortValue: (p) => p.name },
  { header: "SKU" },
  { header: "Category", sortValue: (p) => p.category },
  { header: "Stock", sortValue: (p) => p.stock },
  { header: "Price", sortValue: (p) => p.price },
  { header: "Status", sortValue: (p) => STATUSES.indexOf(p.status) },
  { header: "Added", sortValue: (p) => Date.parse(p.added) || 0 },
  { header: "Action" },
];

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(emptyRange);
  const { toggleFilter, clearFilters, selected, matches, activeCount } =
    useFilters();

  const categories = useMemo(
    () => uniqueValues(adminProducts, (p) => p.category),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return adminProducts.filter(
      (p) =>
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)) &&
        matches("status", p.status) &&
        matches("category", p.category) &&
        inDateRange(p.added, range),
    );
  }, [search, range, matches]);

  return (
    <DataTable<Product>
      title="Product"
      breadcrumb={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Product List" },
      ]}
      action={
        <Link
          to="/admin/products/add"
          id="add-product-btn"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600 active:scale-[.97]"
        >
          <Plus size={16} />
          Add Product
        </Link>
      }
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search product. . ."
      toolbar={
        <>
          <DateFilter value={range} onChange={setRange} />
          <FilterDropdown
            groups={[
              {
                key: "status",
                label: "Status",
                options: STATUSES,
                selected: selected("status"),
              },
              {
                key: "category",
                label: "Category",
                options: categories,
                selected: selected("category"),
              },
            ]}
            onToggle={toggleFilter}
            onClear={clearFilters}
            activeCount={activeCount}
          />
        </>
      }
      columns={COLUMNS}
      rows={filtered}
      rowKey={(product) => product.id}
      renderRow={(product, isSelected, toggle) => (
        <ProductRow
          product={product}
          selected={isSelected}
          onToggle={toggle}
          onView={(p) => console.log("View", p.name)}
          onEdit={(p) => console.log("Edit", p.name)}
          onDelete={(p) => console.log("Delete", p.name)}
        />
      )}
      emptyMessage="No products found."
      minWidth={900}
      selectAllLabel="Select all products"
    />
  );
}

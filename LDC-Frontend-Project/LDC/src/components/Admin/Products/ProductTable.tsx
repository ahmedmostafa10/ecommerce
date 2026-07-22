import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import DataTable, { type Column } from "../../ui/DataTable";
import ProductRow from "./ProductRow";
import type { Product } from "./ProductRow";
import DateFilter from "./DateFilter";
import ProductFilters from "./ProductFilters";
import {
  categoriesOf,
  emptyFilters,
  emptyRange,
  filterProducts,
} from "./productFiltering";
import { adminProducts } from "../../../data/adminProducts";

const COLUMNS: Column[] = [
  { header: "Product", sortable: true },
  { header: "SKU" },
  { header: "Category", sortable: true },
  { header: "Stock", sortable: true },
  { header: "Price" },
  { header: "Status", sortable: true },
  { header: "Added", sortable: true },
  { header: "Action" },
];

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(emptyRange);
  const [filters, setFilters] = useState(emptyFilters);

  const categories = useMemo(() => categoriesOf(adminProducts), []);

  const filtered = useMemo(
    () => filterProducts(adminProducts, search, range, filters),
    [search, range, filters],
  );

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
          <ProductFilters
            value={filters}
            categories={categories}
            onChange={setFilters}
          />
        </>
      }
      columns={COLUMNS}
      rows={filtered}
      rowKey={(product) => product.id}
      renderRow={(product, selected, toggle) => (
        <ProductRow
          product={product}
          selected={selected}
          onToggle={toggle}
          onView={(p) => console.log("View", p.name)}
          onEdit={(p) => console.log("Edit", p.name)}
          onDelete={(p) => console.log("Delete", p.name)}
        />
      )}
      emptyMessage="No products found."
      minWidth={900}
      selectAllLabel="Select all products"
      card={false}
    />
  );
}

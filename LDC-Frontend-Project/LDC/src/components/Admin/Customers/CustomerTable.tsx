import { useState, useMemo } from "react";
import DataTable, { type Column } from "../../ui/DataTable";
import DateFilter from "../../ui/DateFilter";
import FilterDropdown from "../../ui/FilterDropdown";
import { emptyRange, inDateRange, useFilters } from "../../ui/filtering";
import CustomerRow from "./CustomerRow";
import { adminCustomers, type Customer } from "../../../data/adminCustomers";

/** Also drives Status sorting. */
const STATUSES = ["Active", "Blocked"];

const COLUMNS: Column<Customer>[] = [
  { header: "Customer Name", sortValue: (c) => c.name },
  { header: "Phone" },
  { header: "Orders", sortValue: (c) => c.orders },
  { header: "Balance", sortValue: (c) => c.balance },
  { header: "Status", sortValue: (c) => STATUSES.indexOf(c.status) },
  { header: "Created", sortValue: (c) => Date.parse(c.created) || 0 },
  { header: "Action" },
];

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(emptyRange);
  const { toggleFilter, clearFilters, selected, matches, activeCount } =
    useFilters();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return adminCustomers.filter(
      (c) =>
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)) &&
        matches("status", c.status) &&
        inDateRange(c.created, range),
    );
  }, [search, range, matches]);

  return (
    <DataTable
      title="Customer"
      breadcrumb={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Customer List" },
      ]}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search customer. . ."
      toolbar={
        <>
          <DateFilter value={range} onChange={setRange} label="Created" />
          <FilterDropdown
            groups={[
              {
                key: "status",
                label: "Status",
                options: STATUSES,
                selected: selected("status"),
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
      rowKey={(customer) => customer.id}
      renderRow={(customer, isSelected, toggle) => (
        <CustomerRow
          customer={customer}
          selected={isSelected}
          onToggle={toggle}
        />
      )}
      emptyMessage="No customers found."
      selectAllLabel="Select all customers"
    />
  );
}

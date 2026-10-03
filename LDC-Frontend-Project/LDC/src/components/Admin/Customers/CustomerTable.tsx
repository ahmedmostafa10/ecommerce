import { useState, useMemo } from "react";
import DataTable, { type Column } from "../../ui/DataTable";
import DateFilter from "../../ui/DateFilter";
import FilterDropdown from "../../ui/FilterDropdown";
import { emptyRange, inDateRange, useFilters } from "../../ui/filtering";
import CustomerRow from "./CustomerRow";
import { useCustomers, type Customer } from "./useCustomers";

const STATUSES = ["Active", "InActive"];

const COLUMNS: Column<Customer>[] = [
  { header: "Customer Name", sortValue: (c) => c.name },
  { header: "Phone" },
  { header: "Orders", sortValue: (c) => c.orders },
  { header: "Balance", sortValue: (c) => c.balance },
  { header: "Status", sortValue: (c) => STATUSES.indexOf(c.status) },
  { header: "Created", sortValue: (c) => c.createdAt },
  // { header: "Action" },
];

export default function CustomerTable() {
  const [search, setSearch] = useState("");
  const [range, setRange] = useState(emptyRange);
  const { toggleFilter, clearFilters, selected, matches, activeCount } =
    useFilters();

  const { customers, loading, error } = useCustomers();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers.filter(
      (c) =>
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)) &&
        matches("status", c.status) &&
        inDateRange(c.created, range),
    );
  }, [customers, search, range, matches]);

  return (
    <DataTable<Customer>
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
      loading={loading}
      error={error}
      selectAllLabel="Select all customers"
    />
  );
}

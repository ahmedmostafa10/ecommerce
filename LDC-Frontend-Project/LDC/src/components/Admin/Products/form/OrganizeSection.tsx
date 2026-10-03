import FormCard from "../../../ui/FormCard";
import FormField from "../../../ui/FormField";
import FormSelect from "../../../ui/FormSelect";
import { CATEGORIES, STATUSES, STATUS_BADGES } from "./options";
import type { FieldChangeEvent, ProductFormData } from "./useProductForm";

type Props = {
  data: ProductFormData;
  onChange: (e: FieldChangeEvent) => void;
};

export default function OrganizeSection({ data, onChange }: Props) {
  return (
    <>
      <FormCard title="Category">
        <FormField label="Product Category" htmlFor="category">
          <FormSelect
            id="category"
            name="category"
            value={data.category}
            onChange={onChange}
            options={CATEGORIES}
            placeholder="Select a category"
          />
        </FormField>
      </FormCard>

      <FormCard
        title="Status"
        aside={
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGES[data.status]}`}
          >
            {data.status}
          </span>
        }
      >
        <FormField label="Product Status" htmlFor="status">
          <FormSelect
            id="status"
            name="status"
            value={data.status}
            onChange={onChange}
            options={STATUSES}
          />
        </FormField>
      </FormCard>
    </>
  );
}

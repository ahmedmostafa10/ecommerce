import FormCard from "../../../ui/FormCard";
import FormField from "../../../ui/FormField";
import FormInput from "../../../ui/FormInput";
import type { FieldChangeEvent, ProductFormData } from "./useProductForm";

type Props = {
  data: ProductFormData;
  onChange: (e: FieldChangeEvent) => void;
};

export default function InventorySection({ data, onChange }: Props) {
  return (
    <FormCard title="Inventory">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField label="SKU" htmlFor="sku">
          <FormInput
            id="sku"
            name="sku"
            value={data.sku}
            onChange={onChange}
            placeholder="Type product SKU here. . ."
          />
        </FormField>

        <FormField label="Quantity" htmlFor="quantity">
          <FormInput
            id="quantity"
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={onChange}
            placeholder="Type product quantity here. . ."
          />
        </FormField>
      </div>
    </FormCard>
  );
}

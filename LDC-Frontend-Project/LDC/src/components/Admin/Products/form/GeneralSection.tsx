import FormCard from "../../../ui/FormCard";
import FormField from "../../../ui/FormField";
import FormInput from "../../../ui/FormInput";
import FormTextarea from "../../../ui/FormTextarea";
import type { FieldChangeEvent, ProductFormData } from "./useProductForm";

type Props = {
  data: ProductFormData;
  onChange: (e: FieldChangeEvent) => void;
};

export default function GeneralSection({ data, onChange }: Props) {
  return (
    <FormCard title="General Information">
      <div className="flex flex-col gap-5">
        <FormField label="Product Name" htmlFor="product-name">
          <FormInput
            id="product-name"
            name="name"
            value={data.name}
            onChange={onChange}
            placeholder="Type product name here. . ."
            required
          />
        </FormField>

        <FormField label="Description" htmlFor="product-description">
          <FormTextarea
            id="product-description"
            name="description"
            value={data.description}
            onChange={onChange}
            placeholder="Type product description here. . ."
          />
        </FormField>
      </div>
    </FormCard>
  );
}

import FormCard from "../../../ui/FormCard";
import FormField from "../../../ui/FormField";
import FormInput from "../../../ui/FormInput";
import { DIMENSIONS } from "./options";
import type { FieldChangeEvent, ProductFormData } from "./useProductForm";

type Props = {
  data: ProductFormData;
  onChange: (e: FieldChangeEvent) => void;
};

export default function ShippingSection({ data, onChange }: Props) {
  return (
    <FormCard title="Shipping">
      <div className="flex flex-col gap-5">
        <label className="flex cursor-pointer select-none items-center gap-3">
          <input
            type="checkbox"
            name="isPhysical"
            checked={data.isPhysical}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 accent-violet-500"
          />
          <span className="text-sm font-semibold text-violet-600">
            This is a physical product
          </span>
        </label>

        {data.isPhysical && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {DIMENSIONS.map((dimension) => (
              <FormField
                key={dimension.name}
                label={dimension.label}
                htmlFor={dimension.name}
                compact
              >
                <FormInput
                  id={dimension.name}
                  name={dimension.name}
                  value={data[dimension.name]}
                  onChange={onChange}
                  placeholder={dimension.placeholder}
                  compact
                />
              </FormField>
            ))}
          </div>
        )}
      </div>
    </FormCard>
  );
}

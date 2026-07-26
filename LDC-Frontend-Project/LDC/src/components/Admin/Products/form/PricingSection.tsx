import FormCard from "../../../ui/FormCard";
import FormField from "../../../ui/FormField";
import FormInput from "../../../ui/FormInput";
import FormSelect from "../../../ui/FormSelect";
import { DISCOUNT_TYPES, TAX_CLASSES } from "./options";
import type { FieldChangeEvent, ProductFormData } from "./useProductForm";

type Props = {
  data: ProductFormData;
  onChange: (e: FieldChangeEvent) => void;
};

export default function PricingSection({ data, onChange }: Props) {
  const isFixedDiscount = data.discountType === "fixed";
  const hasDiscountType = data.discountType !== "";
  // Zero-rate is a real choice, so only an unset class leaves VAT editable.
  const vatFromTaxClass = data.taxClass !== "";

  return (
    <FormCard title="Pricing">
      <div className="flex flex-col gap-5">
        <FormField label="Base Price" htmlFor="base-price">
          <FormInput
            id="base-price"
            type="number"
            name="basePrice"
            prefix="$"
            value={data.basePrice}
            onChange={onChange}
            placeholder="Type base price here. . ."
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Discount Type" htmlFor="discount-type">
            <FormSelect
              id="discount-type"
              name="discountType"
              value={data.discountType}
              onChange={onChange}
              options={DISCOUNT_TYPES}
              placeholder="Select a discount type"
            />
          </FormField>

          <FormField
            label={isFixedDiscount ? "Discount Amount ($)" : "Discount (%)"}
            htmlFor="discount-pct"
          >
            <FormInput
              id="discount-pct"
              type="number"
              name="discountPercentage"
              min={0}
              max={isFixedDiscount ? undefined : 100}
              value={data.discountPercentage}
              onChange={onChange}
              disabled={!hasDiscountType}
              placeholder={
                hasDiscountType
                  ? isFixedDiscount
                    ? "Type discount amount. . ."
                    : "Type discount percentage. . ."
                  : "Select a discount type first"
              }
              className={!hasDiscountType ? "cursor-not-allowed opacity-60" : ""}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Tax Class" htmlFor="tax-class">
            <FormSelect
              id="tax-class"
              name="taxClass"
              value={data.taxClass}
              onChange={onChange}
              options={TAX_CLASSES}
              placeholder="Select a tax class"
            />
          </FormField>

          <FormField label="VAT Amount (%)" htmlFor="vat-amount">
            <FormInput
              id="vat-amount"
              type="number"
              name="vatAmount"
              min={0}
              max={100}
              value={data.vatAmount}
              onChange={onChange}
              readOnly={vatFromTaxClass}
              placeholder="Type VAT amount. . ."
              className={vatFromTaxClass ? "bg-gray-100 text-gray-500" : ""}
            />
          </FormField>
        </div>
      </div>
    </FormCard>
  );
}

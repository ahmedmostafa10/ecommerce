import { useState } from "react";
import TagIcon from "../../assets/icons/TagIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";

type OrderSummaryProps = {
  subtotal: number;
  discount?: number;
  discountPercent?: number;
  deliveryFee?: number;
  total: number;
  onCheckout?: () => void;
  onApplyPromo?: (code: string) => void;
  className?: string;
};

function SummaryRow({
  label,
  value,
  accent = false,
  large = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={
          accent
            ? "text-base text-[#ff3333]"
            : large
              ? "text-xl font-bold text-black"
              : "text-base text-neutral-500"
        }
      >
        {label}
      </span>
      <span
        className={
          accent
            ? "text-base font-medium text-[#ff3333]"
            : large
              ? "text-xl font-bold text-black"
              : "text-base font-bold text-black"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default function OrderSummary({
  subtotal,
  discount = 0,
  discountPercent = 20,
  deliveryFee = 15,
  total,
  onCheckout,
  onApplyPromo,
  className = "",
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    onApplyPromo?.(promoCode.trim());
  };

  return (
    <aside
      className={`rounded-[20px] border border-neutral-200 bg-white p-5 sm:p-6 ${className}`}
    >
      <h2 className="text-2xl font-bold text-black">Order Summary</h2>

      <div className="mt-5 flex flex-col gap-4">
        <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(0)}`} />
        {discount > 0 && (
          <SummaryRow
            label={`Discount (-${discountPercent}%)`}
            value={`-$${discount.toFixed(0)}`}
            accent
          />
        )}
        <SummaryRow
          label="Delivery Fee"
          value={`$${deliveryFee.toFixed(0)}`}
        />
      </div>

      <hr className="my-5 border-neutral-200" />

      <SummaryRow
        label="Total"
        value={`$${total.toFixed(0)}`}
        large
      />

      <div className="mt-5 flex gap-3">
        <div className="relative min-w-0 flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <TagIcon className="h-4 w-4 text-neutral-400" />
          </span>
          <input
            type="text"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="Add promo code"
            className="h-12 w-full rounded-full bg-neutral-100 pl-11 pr-4 text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </div>
        <button
          type="button"
          onClick={handleApplyPromo}
          className="h-12 shrink-0 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:opacity-90"
        >
          Apply
        </button>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-base font-medium text-white transition hover:opacity-90"
      >
        Go to Checkout
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </aside>
  );
}

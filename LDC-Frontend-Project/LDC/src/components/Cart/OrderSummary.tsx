import { useState } from "react";

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

function TagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 text-neutral-400"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

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
            <TagIcon />
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
        <ArrowRightIcon />
      </button>
    </aside>
  );
}

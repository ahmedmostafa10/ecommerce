import Visa from "../../assets/payments/Visa.webp";
import MasterCard from "../../assets/payments/MasterCard.webp";
import PayPal from "../../assets/payments/PayPal.webp";
import ApplePay from "../../assets/payments/ApplePay.webp";
import GooglePay from "../../assets/payments/GooglePay.webp";

const PAYMENT_ICONS: Record<string, string> = {
  Visa,
  MasterCard,
  PayPal,
  ApplePay,
  GooglePay,
};

export default function PaymentBadge({ name }: { name: string }) {
  return (
    <span className="flex h-7 min-w-12 items-center justify-center rounded-md border border-neutral-200 bg-white px-2 text-[0.65rem] font-semibold text-neutral-700">
      <img src={PAYMENT_ICONS[name]} alt={name} className="h-6" />
    </span>
  );
}

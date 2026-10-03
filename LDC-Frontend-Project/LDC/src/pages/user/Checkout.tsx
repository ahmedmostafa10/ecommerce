import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import InputField from "../../components/ui/InputField";
import { useToast } from "../../components/ui/ToastProvider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearCart,
  selectCartItems,
  selectCartSubtotal,
} from "../../store/slices/cartslice";
import { selectUser } from "../../store/slices/authslice";
import { createOrder } from "../../services/orders";

const DELIVERY_FEE = 15;
const TAX_RATE = 0.14;

export default function Checkout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const user = useAppSelector(selectUser);

  const [shipping, setShipping] = useState({
    fullName: user?.name ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    city: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + tax + (items.length > 0 ? DELIVERY_FEE : 0);

  function handleField(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || items.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      const order = await createOrder({
        fullName: shipping.fullName.trim(),
        phone: shipping.phone.trim(),
        address: shipping.address.trim(),
        city: shipping.city.trim(),
        notes: shipping.notes.trim() || undefined,
        orderItems: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      dispatch(clearCart());
      toast({
        message: "Order placed",
        description: `Total $${order.totalAmount.toFixed(2)}`,
      });
      navigate("/products");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not place the order. Please try again.";
      setError(message);
      toast({
        message: "Checkout failed",
        description: message,
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[
          { label: "Home", href: "/Home" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-[32px] font-bold text-black sm:mb-8 sm:text-[40px]">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-[20px] border border-neutral-200 bg-white px-6 py-16 text-center">
            <p className="text-lg text-neutral-500">
              Your cart is empty, so there is nothing to check out.
            </p>
            <Link
              to="/products"
              className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-8"
          >
            {/* Shipping details */}
            <section className="rounded-[20px] border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-xl font-bold text-black">
                Shipping details
              </h2>

              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    id="fullName"
                    name="fullName"
                    label="Full name"
                    value={shipping.fullName}
                    onChange={handleField}
                    placeholder="Your full name"
                    required
                  />
                  <InputField
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone"
                    value={shipping.phone}
                    onChange={handleField}
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>

                <InputField
                  id="address"
                  name="address"
                  label="Address"
                  value={shipping.address}
                  onChange={handleField}
                  placeholder="Street, building, apartment"
                  required
                />

                <InputField
                  id="city"
                  name="city"
                  label="City"
                  value={shipping.city}
                  onChange={handleField}
                  placeholder="City"
                  required
                />

                <InputField
                  id="notes"
                  name="notes"
                  label="Order notes (optional)"
                  value={shipping.notes}
                  onChange={handleField}
                  placeholder="Delivery instructions"
                />
              </div>
            </section>

            {/* Order summary */}
            <aside className="rounded-[20px] border border-neutral-200 bg-white p-5 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-xl font-bold text-black">Order Summary</h2>

              <ul className="mt-5 flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-black">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <hr className="my-5 border-neutral-200" />

              <div className="flex flex-col gap-3 text-base">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-bold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tax (14%)</span>
                  <span className="font-bold text-black">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Delivery Fee</span>
                  <span className="font-bold text-black">
                    ${DELIVERY_FEE.toFixed(2)}
                  </span>
                </div>
              </div>

              <hr className="my-5 border-neutral-200" />

              <div className="flex justify-between">
                <span className="text-xl font-bold text-black">Total</span>
                <span className="text-xl font-bold text-black">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-base font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Placing order...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Place Order
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="mt-3 block text-center text-sm text-neutral-500 underline-offset-4 hover:underline"
              >
                Back to cart
              </Link>
            </aside>
          </form>
        )}
      </main>

      <Footer />
    </>
  );
}

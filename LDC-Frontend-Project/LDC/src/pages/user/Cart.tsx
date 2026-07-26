import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import CartItem from "../../components/Cart/CartItem";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useToast } from "../../components/ui/ToastProvider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  removeFromCart,
  selectCartItems,
  selectCartSubtotal,
  setQuantity,
} from "../../store/slices/cartslice";

const DELIVERY_FEE = 15;

export default function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  const discount = 0;
  const total = subtotal - discount + (items.length > 0 ? DELIVERY_FEE : 0);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-[32px] font-bold text-black sm:mb-8 sm:text-[40px]">
          Your cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-[20px] border border-neutral-200 bg-white px-6 py-16 text-center">
            <p className="text-lg text-neutral-500">
              Your cart is empty. Start shopping to add items.
            </p>
            <Link
              to="/products"
              className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-8">
            <section
              aria-label="Cart items"
              className="rounded-[20px] border border-neutral-200 bg-white px-4 sm:px-6"
            >
              {items.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    image: item.image,
                    title: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    maxQuantity: item.maxQuantity,
                  }}
                  onQuantityChange={(id, quantity) =>
                    dispatch(setQuantity({ id, quantity }))
                  }
                  onRemove={(id) => {
                    dispatch(removeFromCart(id));
                    toast({
                      message: "Removed from cart",
                      description: item.name,
                    });
                  }}
                  isLast={index === items.length - 1}
                />
              ))}
            </section>

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={DELIVERY_FEE}
              total={total}
              onCheckout={() => navigate("/checkout")}
              className="lg:sticky lg:top-8"
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import CartItem, { type CartItemData } from "../../components/Cart/CartItem";
import OrderSummary from "../../components/Cart/OrderSummary";
import coatImg from "../../assets/categories/shirt.webp";
import hoodieImg from "../../assets/categories/Tshirt.webp";
import jeansImg from "../../assets/categories/jeans.webp";

const DISCOUNT_PERCENT = 20;
const DELIVERY_FEE = 15;

const INITIAL_CART_ITEMS: CartItemData[] = [
  {
    id: "gradient-graphic-tshirt",
    image: hoodieImg,
    title: "Gradient Graphic T-shirt",
    price: 145,
    size: "Large",
    color: "White",
    quantity: 1,
  },
  {
    id: "checkered-shirt",
    image: coatImg,
    title: "Checkered Shirt",
    price: 180,
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: "skinny-fit-jeans",
    image: jeansImg,
    title: "Skinny Fit Jeans",
    price: 240,
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
];

export default function Cart() {
  const [items, setItems] = useState<CartItemData[]>(INITIAL_CART_ITEMS);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const { subtotal, discount, total } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discountValue = Math.round(
      subtotalValue * (DISCOUNT_PERCENT / 100),
    );
    const totalValue = subtotalValue - discountValue + DELIVERY_FEE;

    return {
      subtotal: subtotalValue,
      discount: discountValue,
      total: totalValue,
    };
  }, [items]);

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
              to="/Products"
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
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  isLast={index === items.length - 1}
                />
              ))}
            </section>

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              discountPercent={DISCOUNT_PERCENT}
              deliveryFee={DELIVERY_FEE}
              total={total}
              className="lg:sticky lg:top-8"
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

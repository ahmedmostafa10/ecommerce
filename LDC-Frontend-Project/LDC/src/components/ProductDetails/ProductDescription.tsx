import { useState } from "react";
import Rating from "../ui/Rating";
import QuantitySelector from "../ui/QuantitySelector";

type ProductDescriptionProps = {
  title?: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  description?: string;
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  className?: string;
};

export default function ProductDescription({
  title = "One Life Graphic T-shirt",
  rating,
  price = 260,
  originalPrice = 300,
  description = "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onAddToCart,
  className = "",
}: ProductDescriptionProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const hasDiscount =
    originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className={`flex h-full flex-col justify-center gap-5 sm:gap-6 ${className}`}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-[var(--brand)] sm:text-4xl">
          {title}
        </h1>
        {rating !== undefined && <Rating value={rating} size="md" />}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[32px] font-bold leading-none text-[var(--brand)]">
          ${price}
        </p>
        {hasDiscount && (
          <>
            <p className="text-2xl font-bold text-neutral-400 line-through">
              ${originalPrice}
            </p>
            <span className="rounded-full bg-[#ffebf0] px-3 py-1 text-sm font-medium text-[#ff4d6d]">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      <p className="max-w-xl text-base leading-relaxed text-neutral-500">
        {description}
      </p>

      <hr className="border-neutral-200" />

      <div className="mt-auto flex flex-row gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={minQuantity}
          max={maxQuantity}
        />

        <button
          type="button"
          onClick={handleAddToCart}
          className="h-14 flex items-center justify-center w-full rounded-full bg-[var(--brand)] text-base font-medium text-white transition hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

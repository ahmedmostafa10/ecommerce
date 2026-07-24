import Rating from "./ui/Rating";

type ItemProps = {
  image: string;
  title: string;
  rating?: number;
  price: number;
  originalPrice?: number;
  onClick?: () => void;
  className?: string;
};

export default function Item({
  image,
  title,
  rating,
  price,
  originalPrice,
  onClick,
  className = "",
}: ItemProps) {
  const Wrapper = onClick ? "button" : "article";
  const hasDiscount =
    originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`flex w-full flex-col gap-3 text-left ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="overflow-hidden rounded-[20px] bg-neutral-100 aspect-4/5">
        <div className="flex  items-center justify-center">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-[var(--brand)] sm:text-lg">
          {title}
        </h3>

        {rating !== undefined && <Rating value={rating} />}

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-2xl font-bold text-[var(--brand)]">${price}</p>
          {hasDiscount && (
            <>
              <p className="text-xl font-bold text-neutral-400 line-through">
                ${originalPrice}
              </p>
              <span className="rounded-full bg-[#ffebf0] px-2.5 py-0.5 text-sm font-medium text-[#ff4d6d]">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

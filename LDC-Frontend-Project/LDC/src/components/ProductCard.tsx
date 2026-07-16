type ItemProps = {
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  onClick?: () => void;
  className?: string;
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Rating({ value }: { value: number }) {
  const clamped = Math.min(5, Math.max(0, value));

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, clamped - index));

          if (fill >= 1) {
            return (
              <StarIcon
                key={index}
                className="h-4 w-4 text-amber-400"
              />
            );
          }

          if (fill > 0) {
            return (
              <span key={index} className="relative h-4 w-4">
                <StarIcon className="absolute inset-0 h-4 w-4 text-neutral-200" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <StarIcon className="h-4 w-4 text-amber-400" />
                </span>
              </span>
            );
          }

          return (
            <StarIcon
              key={index}
              className="h-4 w-4 text-neutral-200"
            />
          );
        })}
      </div>
      <span className="text-sm text-neutral-500">
        {clamped % 1 === 0 ? clamped : clamped.toFixed(1)}/5
      </span>
    </div>
  );
}

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

        <Rating value={rating} />

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

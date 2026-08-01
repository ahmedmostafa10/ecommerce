import { Link } from "react-router-dom";
import Rating from "./ui/Rating";

type ItemProps = {
  image: string;
  title: string;
  rating?: number;
  price: number;
  originalPrice?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Item({
  image,
  title,
  rating,
  price,
  originalPrice,
  href,
  onClick,
  className = "",
}: ItemProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const wrapperClass = `flex w-full flex-col gap-3 text-left ${
    href || onClick ? "cursor-pointer" : ""
  } ${className}`;

  const content = (
    <>
      <div className="overflow-hidden rounded-[20px] bg-neutral-100 ">
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
    </>
  );

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={wrapperClass}>
        {content}
      </button>
    );
  }

  return <article className={wrapperClass}>{content}</article>;
}

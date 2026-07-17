import { useEffect, useRef, useState } from "react";
import Item from "./ProductCard";

export type ProductSectionItem = {
  id: string;
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
};

type ProductSectionProps = {
  title: string;
  products: ProductSectionItem[];
  viewAllTitle?: boolean;
  viewAllHref?: string;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 flex items-center justify-center"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export default function ProductSection({
  title,
  products,
  viewAllTitle = true,
  viewAllHref = "#",
}: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-product-card]");
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-10 sm:mb-12">
          <div className="text-center">
            <h2 className="text-base font-bold tracking-[0.2em] text-[var(--brand)] sm:text-lg">
              {title}
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-full max-w-md bg-[var(--brand)]" />
          </div>
          {viewAllTitle && <a
            href={viewAllHref}
            className="absolute right-0 top-0 text-sm text-neutral-500 underline-offset-4 hover:underline"
          >
            View all
          </a>
          }
        </div>

        <div className="relative flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={`Previous ${title.toLowerCase()}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[var(--brand)] transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronIcon direction="left" />
          </button>

          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                data-product-card
                className="w-[calc((100%-4rem)/5)] min-w-[180px] shrink-0 sm:min-w-[200px] lg:min-w-0"
              >
                <Item
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  price={product.price}
                  originalPrice={product.originalPrice}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={`Next ${title.toLowerCase()}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-[var(--brand)] transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

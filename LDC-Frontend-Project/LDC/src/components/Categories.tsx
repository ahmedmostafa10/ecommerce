import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  type Categories as CategoryList,
} from "../services/products";
import tShirtImg from "../assets/categories/Tshirt.webp";
import shirtsImg from "../assets/categories/shirt.webp";
import poloImg from "../assets/categories/Polo.webp";
import pantsImg from "../assets/categories/pants.webp";
import jeansImg from "../assets/categories/jeans.webp";
import shoesImg from "../assets/categories/shoes.webp";
import watchImg from "../assets/categories/watch.webp";
import jacketImg from "../assets/categories/jacket.webp";
import placeholderImg from "../assets/categories/image.png";

const FALLBACK_IMAGES: Record<string, string> = {
  Watch: watchImg,
  shoes: shoesImg,
  "t-shirt": tShirtImg,
  shirts: shirtsImg,
  polo: poloImg,
  pants: pantsImg,
  jeans: jeansImg,
  jacket: jacketImg,
};

function imageFor(type: string, sampleImageUrl: string | null): string {
  if (!FALLBACK_IMAGES[type.toLowerCase()]) {
    return sampleImageUrl ?? placeholderImg;
  }
  return FALLBACK_IMAGES[type.toLowerCase()] ?? placeholderImg;
}

type CategoriesProps = {
  onSelect?: (type: string) => void;
};

export default function Categories({ onSelect }: CategoriesProps) {
  const [categories, setCategories] = useState<CategoryList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => active && setCategories(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-10 flex items-center gap-4 sm:mb-12">
          <div className="h-px flex-1 bg-neutral-200" />
          <h2 className="shrink-0 text-base font-bold tracking-[0.2em] text-[var(--brand)] sm:text-lg">
            CATEGORIES
          </h2>
          <div className="h-px flex-1 bg-neutral-200" />
          <Link
            to="/products"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white pl-4 text-sm text-neutral-500 underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="h-28 w-28 animate-pulse rounded-full bg-neutral-100 sm:h-32 sm:w-32 lg:h-36 lg:w-36" />
                <div className="h-4 w-16 animate-pulse rounded bg-neutral-100" />
              </div>
            ))}
          </div>
        ) : error || categories.length === 0 ? (
          <p className="text-center text-sm text-neutral-400">
            No categories to show yet.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 sm:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.type}
                to={`/products?type=${encodeURIComponent(category.type)}`}
                onClick={() => onSelect?.(category.type)}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#eeeeee_0%,_#f8f8f8_45%,_transparent_72%)]" />
                  <img
                    src={imageFor(category.type, category.sampleImageUrl)}
                    alt={category.type}
                    className="relative z-10 h-[78%] w-[78%] object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <span className="text-sm font-medium text-[var(--brand)] decoration-[var(--brand)] underline-offset-4 transition-all group-hover:underline sm:text-base">
                  {category.type}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import jacketImg from "../assets/categories/image.png";
import hoodieImg from "../assets/categories/Tshirt.webp";
import trousersImg from "../assets/categories/pants.webp";
import coatImg from "../assets/categories/shirt.webp";
import jeansImg from "../assets/categories/jeans.webp";
import poloImg from "../assets/categories/Polo.webp";

export type ProductGridItem = {
  id: string;
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
};

const SORT_OPTIONS = {
  "most-popular": "Most Popular",
  "price-low-high": "Price: Low to High",
  "price-high-low": "Price: High to Low",
  rating: "Rating",
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

const ALL_PRODUCTS: ProductGridItem[] = [
  {
    id: "gradient-graphic-tshirt",
    image: hoodieImg,
    title: "Gradient Graphic T-shirt",
    rating: 3.5,
    price: 145,
  },
  {
    id: "polo-with-tipping-details",
    image: poloImg,
    title: "Polo with Tipping Details",
    rating: 4.5,
    price: 180,
  },
  {
    id: "black-striped-tshirt",
    image: jacketImg,
    title: "Black Striped T-shirt",
    rating: 5,
    price: 120,
    originalPrice: 150,
  },
  {
    id: "skinny-fit-jeans",
    image: jeansImg,
    title: "Skinny Fit Jeans",
    rating: 3.5,
    price: 240,
    originalPrice: 260,
  },
  {
    id: "checkered-shirt",
    image: coatImg,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
  },
  {
    id: "sleeve-striped-tshirt",
    image: hoodieImg,
    title: "Sleeve Striped T-shirt",
    rating: 4.5,
    price: 130,
    originalPrice: 160,
  },
  {
    id: "vertical-striped-shirt",
    image: coatImg,
    title: "Vertical Striped Shirt",
    rating: 5,
    price: 212,
    originalPrice: 232,
  },
  {
    id: "courage-graphic-tshirt",
    image: jacketImg,
    title: "Courage Graphic T-shirt",
    rating: 4,
    price: 145,
  },
  {
    id: "loose-fit-bermuda-shorts",
    image: trousersImg,
    title: "Loose Fit Bermuda Shorts",
    rating: 3,
    price: 80,
  },
];

export { ALL_PRODUCTS };

type ProductGridProps = {
  products?: ProductGridItem[];
  totalProducts?: number;
  currentPage?: number;
  pageSize?: number;
  className?: string;
};

function sortProducts(products: ProductGridItem[], sortBy: SortOption) {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

export default function ProductGrid({
  products = ALL_PRODUCTS,
  totalProducts = 100,
  currentPage = 1,
  pageSize = 10,
  className = "",
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("most-popular");

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy],
  );

  const start = totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalProducts);

  return (
    <section className={`flex-1 ${className}`}>
      <div className="mb-8 flex flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--brand)] sm:text-4xl">
          Products
        </h1>

        <div className="flex flex-wrap items-center flex-row align-center justify-end gap-4 text-sm text-neutral-500">
          <span className="hidden sm:inline-block">
            Showing {start}-{end} of {totalProducts} Products
          </span>

          <div className="flex items-center gap-2 s">
            <span>Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                aria-label="Sort products"
                className="appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-3 text-sm font-medium text-[var(--brand)] outline-none transition focus:border-neutral-300"
              >
                {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            rating={product.rating}
            price={product.price}
            originalPrice={product.originalPrice}
          />
        ))}
      </div>
    </section>
  );
}

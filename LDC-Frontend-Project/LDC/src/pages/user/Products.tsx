import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "../../components/ui/Filter";
import Pagination from "../../components/ui/Pagination";
import ProductGrid, {
  type ProductGridItem,
} from "../../components/ProductGrid";
import {
  getProducts,
  getBestSellers,
  getNewArrivals,
  getLastPieces,
  type ProductResponse,
} from "../../services/products";
import placeholderImg from "../../assets/categories/image.png";

const PAGE_SIZE = 10;

const SECTIONS = {
  "best-sellers": { label: "Best Sellers", fetch: getBestSellers },
  "new-arrivals": { label: "New Arrivals", fetch: getNewArrivals },
  "last-pieces": { label: "Last Pieces", fetch: getLastPieces },
} as const;

type SectionKey = keyof typeof SECTIONS;

function isSectionKey(value: string | null): value is SectionKey {
  return value !== null && value in SECTIONS;
}

function toGridItem(product: ProductResponse): ProductGridItem {
  const pct = product.discountPercentage ?? 0;
  return {
    id: product.id,
    image:
      product.coverImageUrl ?? product.productImages[0]?.url ?? placeholderImg,
    title: product.name,
    price: product.amount,
    originalPrice:
      pct > 0 ? Math.round(product.amount / (1 - pct / 100)) : undefined,
  };
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") ?? undefined;
  const sectionParam = searchParams.get("section");
  const section = isSectionKey(sectionParam) ? sectionParam : undefined;
  const activeLabel = section ? SECTIONS[section].label : type;

  const [products, setProducts] = useState<ProductGridItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  useEffect(() => setCurrentPage(1), [type, section]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    const request = section
      ? SECTIONS[section].fetch(100).then((items) => ({
          items,
          totalCount: items.length,
        }))
      : getProducts(currentPage, PAGE_SIZE, type);

    request
      .then((data) => {
        if (!active) return;
        setProducts(data.items.map(toGridItem));
        setTotalCount(data.totalCount);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [type, section, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);

  const pageProducts = useMemo(() => {
    const priced = priceRange
      ? products.filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
        )
      : products;

    return section
      ? priced.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      : priced;
  }, [products, priceRange, section, page]);

  function handleFilterApply(value: [number, number]) {
    setPriceRange(value);
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[
          { label: "Home", href: "/Home" },
          ...(activeLabel
            ? [{ label: "Products", href: "/products" }, { label: activeLabel }]
            : [{ label: "Products" }]),
        ]}
      />

      <div className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {activeLabel && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-neutral-500">
              {section ? "Showing:" : "Filtered by:"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-3 py-1.5 text-sm font-medium text-white">
              {activeLabel}
              <Link
                to="/products"
                aria-label="Clear filter"
                className="rounded-full p-0.5 transition hover:bg-white/20"
              >
                <X size={14} />
              </Link>
            </span>
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 justify-between">
          <aside className="w-full shrink-0 lg:w-72 xl:w-80">
            <Filter
              min={0}
              max={10000}
              initial={priceRange ?? [0, 10000]}
              onApply={handleFilterApply}
            />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-10">
            {loading ? (
              <p className="py-20 text-center text-sm text-neutral-400">
                Loading products...
              </p>
            ) : error ? (
              <p className="py-20 text-center text-sm text-red-500">
                Could not load products.
              </p>
            ) : pageProducts.length === 0 ? (
              <p className="py-20 text-center text-sm text-neutral-400">
                No products found{activeLabel ? ` in ${activeLabel}` : ""}.
              </p>
            ) : (
              <>
                <ProductGrid
                  products={pageProducts}
                  totalProducts={totalCount}
                  currentPage={page}
                  pageSize={PAGE_SIZE}
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

import { useMemo, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import Filter from "../../components/ui/Filter";
import Pagination from "../../components/ui/Pagination";
import ProductGrid, {
  ALL_PRODUCTS,
  type ProductGridItem,
} from "../../components/ProductGrid";

const PAGE_SIZE = 10;
const TOTAL_PRODUCTS = 80;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE);

function getPageProducts(
  products: ProductGridItem[],
  page: number,
): ProductGridItem[] {
  const start = (page - 1) * PAGE_SIZE;

  return Array.from({ length: PAGE_SIZE }, (_, index) => {
    const product = products[(start + index) % products.length];
    return {
      ...product,
      id: `${product.id}-page-${page}-${index}`,
    };
  });
}

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const filteredProducts = useMemo(
    () =>
      ALL_PRODUCTS.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      ),
    [priceRange],
  );

  const pageProducts = useMemo(
    () => getPageProducts(filteredProducts, currentPage),
    [filteredProducts, currentPage],
  );

  const handleFilterApply = (value: [number, number]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[{ label: "Home", href: "/Home" }, { label: "Products" }]}
      />

      <div className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 justify-between">
          <aside className="w-full shrink-0 lg:w-72 xl:w-80">
            <Filter initial={priceRange} onApply={handleFilterApply} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <ProductGrid
              products={pageProducts}
              totalProducts={TOTAL_PRODUCTS}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

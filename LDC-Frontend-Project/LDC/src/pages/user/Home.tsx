import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import Categories from "../../components/Categories";
import ProductSection from "../../components/ProductSection";
import { useHomeSections } from "../../components/useHomeSections";

export default function Products() {
  const { bestSellers, newArrivals, lastPieces, loading } = useHomeSections();

  return (
    <>
      <AnnouncementBar />
      <Header />
      <Categories />
      {!loading && bestSellers.length > 0 && (
        <ProductSection
          title="BEST SELLERS"
          products={bestSellers}
          viewAllHref="/products?section=best-sellers"
        />
      )}
      {!loading && newArrivals.length > 0 && (
        <ProductSection
          title="NEW ARRIVALS"
          products={newArrivals}
          viewAllHref="/products?section=new-arrivals"
        />
      )}
      {!loading && lastPieces.length > 0 && (
        <ProductSection
          title="LAST PIECES"
          products={lastPieces}
          viewAllHref="/products?section=last-pieces"
        />
      )}
      <Footer />
    </>
  );
}

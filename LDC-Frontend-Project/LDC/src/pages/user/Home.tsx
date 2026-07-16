import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import Categories from "../../components/Categories";
import ProductSection from "../../components/ProductSection";
import {
  BEST_SELLERS,
  LAST_PIECES,
  NEW_ARRIVALS,
} from "../../data/homeProducts";

export default function Products() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Categories />
      <ProductSection title="BEST SELLERS" products={BEST_SELLERS} />
      <ProductSection title="NEW ARRIVALS" products={NEW_ARRIVALS} />
      <ProductSection title="LAST PIECES" products={LAST_PIECES} />
      <Footer />
    </>
  );
}

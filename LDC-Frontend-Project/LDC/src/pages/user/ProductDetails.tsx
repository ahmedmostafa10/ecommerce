import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import ProductDescription from "../../components/ProductDetails/ProductDescription";
import ProductGallery from "../../components/ProductDetails/ProductGallery";
import ProductSection from "../../components/ProductSection";
import { NEW_ARRIVALS } from "../../data/homeProducts";

export default function ProductDetails() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[{ label: "Home", href: "/Home" }, { label: "Products", href: "/Products" }, { label: "Product Details" }]}
      />
      <main className="mx-auto max-w-screen-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <ProductGallery />
          <ProductDescription />
        </div>
      </main>
      <ProductSection title="You Might Also Like" products={NEW_ARRIVALS} viewAllTitle={false} />
      <Footer />
    </>
  );
}

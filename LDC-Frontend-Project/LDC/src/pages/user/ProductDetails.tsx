import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import ProductDescription from "../../components/ProductDetails/ProductDescription";
import ProductGallery from "../../components/ProductDetails/ProductGallery";
import ProductSection from "../../components/ProductSection";
import { useHomeSections } from "../../components/useHomeSections";
import { getProductById, type ProductResponse } from "../../services/products";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartslice";
import { useToast } from "../../components/ui/ToastProvider";
import placeholderImg from "../../assets/categories/image.png";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { newArrivals } = useHomeSections();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }

    let active = true;
    setLoading(true);
    setError(false);
    window.scrollTo({ top: 0 });

    getProductById(id)
      .then((data) => active && setProduct(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  const images = product?.productImages.length
    ? product.productImages.map((image) => image.url)
    : [placeholderImg];

  function handleAddToCart(quantity: number) {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        image: images[0],
        price: product.amount,
        quantity,
        maxQuantity: Math.max(1, product.stockQuantity),
      }),
    );

    toast({
      message: "Added to cart",
      description: `${quantity} × ${product.name}`,
    });
  }

  const discountPct = product?.discountPercentage ?? 0;
  const originalPrice =
    product && discountPct > 0
      ? Math.round(product.amount / (1 - discountPct / 100))
      : undefined;

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[
          { label: "Home", href: "/Home" },
          { label: "Products", href: "/products" },
          { label: product?.name ?? "Product Details" },
        ]}
      />

      <main className="mx-auto max-w-screen-3xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <p className="py-20 text-center text-sm text-neutral-400">
            Loading product...
          </p>
        ) : error || !product ? (
          <p className="py-20 text-center text-sm text-red-500">
            Could not load this product.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
            <ProductGallery images={images} alt={product.name} />
            <ProductDescription
              title={product.name}
              price={product.amount}
              originalPrice={originalPrice}
              description={product.description}
              maxQuantity={Math.max(1, product.stockQuantity)}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}
      </main>

      {newArrivals.length > 0 && (
        <ProductSection
          title="You Might Also Like"
          products={newArrivals.filter((item) => item.id !== id)}
          viewAllTitle={false}
        />
      )}
      <Footer />
    </>
  );
}

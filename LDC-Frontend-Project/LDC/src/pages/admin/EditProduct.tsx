import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProductForm from "../../components/Admin/Products/ProductForm";
import type { ProductFormInitialState } from "../../components/Admin/Products/form/useProductForm";
import { getProductById, type ProductResponse } from "../../services/products";

const LOW_STOCK_THRESHOLD = 10;

function toFormState(product: ProductResponse): ProductFormInitialState {
  const cover =
    product.coverImageUrl ??
    product.productImages.find((image) => image.isCover)?.url;

  // Everything except the cover makes up the gallery.
  const galleryUrls = product.productImages
    .filter((image) => image.url !== cover)
    .map((image) => image.url);

  // The API stores only InStock/OutOfStock, so the richer status is derived.
  const status =
    product.status === "OutOfStock" || product.stockQuantity === 0
      ? "Out of Stock"
      : product.stockQuantity <= LOW_STOCK_THRESHOLD
        ? "Low Stock"
        : "Published";

  return {
    data: {
      name: product.name,
      description: product.description ?? "",
      basePrice: String(product.amount ?? ""),
      discountType: product.discountType ?? "",
      discountPercentage: product.discountPercentage
        ? String(product.discountPercentage)
        : "",
      taxClass: product.taxClass ?? "",
      vatAmount: product.vatAmount ? String(product.vatAmount) : "",
      sku: product.sku ?? "",
      quantity: String(product.stockQuantity ?? ""),
      isPhysical: product.isPhysical ?? true,
      weight: product.weight ?? "",
      height: product.height ?? "",
      length: product.length ?? "",
      width: product.width ?? "",
      category: product.type ?? "",
      status,
    },
    coverUrl: cover,
    galleryUrls,
  };
}

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();

  const [initial, setInitial] = useState<ProductFormInitialState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No product selected.");
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((product) => active && setInitial(toFormState(product)))
      .catch(() =>
        active ? setError("Could not load this product.") : undefined,
      )
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex h-full items-center justify-center py-20 text-sm text-gray-400">
          <Loader2 size={18} className="mr-2 animate-spin" />
          Loading product...
        </div>
      ) : error || !initial ? (
        <div className="flex h-full items-center justify-center py-20 text-sm text-red-500">
          {error ?? "Could not load this product."}
        </div>
      ) : (
        // Keyed so the form state is rebuilt if the id changes.
        <ProductForm key={id} productId={id} initial={initial} />
      )}
    </AdminLayout>
  );
}

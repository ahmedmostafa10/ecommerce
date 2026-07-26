import { useCallback, useEffect, useState } from "react";
import { getProducts, type ProductResponse } from "../../../services/products";
import type { Product, ProductStatus } from "./ProductRow";

const LOW_STOCK_THRESHOLD = 10;

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toStatus(response: ProductResponse): ProductStatus {
  if (response.status === "OutOfStock" || response.stockQuantity === 0) {
    return "Out of Stock";
  }
  return response.stockQuantity <= LOW_STOCK_THRESHOLD
    ? "Low Stock"
    : "Published";
}

export function toProduct(response: ProductResponse): Product {
  return {
    id: response.id,
    name: response.name,
    variants: response.productImages.length,
    image: response.coverImageUrl ?? response.productImages[0]?.url,

    sku: response.id.slice(0, 8).toUpperCase(),
    category: response.type,
    stock: response.stockQuantity,
    price: response.amount,
    status: toStatus(response),
    added: formatDate(response.createdOn),
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(1, 100);
      setProducts(response.items.filter((p) => !p.isDeleted).map(toProduct));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { products, loading, error, refetch };
}

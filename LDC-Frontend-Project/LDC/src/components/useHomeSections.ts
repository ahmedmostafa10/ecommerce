import { useEffect, useState } from "react";
import {
  getBestSellers,
  getNewArrivals,
  getLastPieces,
  type ProductResponse,
} from "../services/products";
import type { ProductSectionItem } from "./ProductSection";
import placeholderImg from "../assets/categories/image.png";

function toSectionItem(product: ProductResponse): ProductSectionItem {
  const pct = product.discountPercentage ?? 0;
  return {
    id: product.id,
    image: product.productImages[0]?.url ?? placeholderImg,
    title: product.name,
    price: product.amount,
    originalPrice:
      pct > 0 ? Math.round(product.amount / (1 - pct / 100)) : undefined,
  };
}

type HomeSections = {
  bestSellers: ProductSectionItem[];
  newArrivals: ProductSectionItem[];
  lastPieces: ProductSectionItem[];
  loading: boolean;
  error: boolean;
};

export function useHomeSections(): HomeSections {
  const [state, setState] = useState<HomeSections>({
    bestSellers: [],
    newArrivals: [],
    lastPieces: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    Promise.all([getBestSellers(), getNewArrivals(), getLastPieces()])
      .then(([best, arrivals, last]) => {
        if (!active) return;
        setState({
          bestSellers: best.map(toSectionItem),
          newArrivals: arrivals.map(toSectionItem),
          lastPieces: last.map(toSectionItem),
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (active) setState((s) => ({ ...s, loading: false, error: true }));
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}

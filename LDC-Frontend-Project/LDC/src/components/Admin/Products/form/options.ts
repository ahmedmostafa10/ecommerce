import type { ProductStatus } from "./useProductForm";

export const DISCOUNT_TYPES = [
  { value: "percentage", label: "Percentage (%)" },
  { value: "fixed", label: "Fixed Amount ($)" },
] as const;

export const TAX_CLASSES = [
  { value: "standard", label: "Standard Rate (14%)" },
  { value: "reduced", label: "Reduced Rate (5%)" },
  { value: "zero", label: "Zero Rate (0%)" },
] as const;

export const TAX_CLASS_RATES: Record<string, number> = {
  standard: 14,
  reduced: 5,
  zero: 0,
};

export const CATEGORIES = [
  "Watch",
  "Shoes",
  "T-Shirt",
  "Shirts",
  "Polo",
  "Pants",
  "Jeans",
  "Jacket",
].map((name) => ({ value: name, label: name }));

export const STATUSES = ["Draft", "Published", "Low Stock", "Out of Stock"].map(
  (name) => ({ value: name, label: name }),
);

export const STATUS_BADGES: Record<ProductStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Published: "bg-emerald-50 text-emerald-600",
  "Low Stock": "bg-amber-50 text-amber-600",
  "Out of Stock": "bg-red-50 text-red-500",
};

export const DIMENSIONS = [
  { name: "weight", label: "Weight", placeholder: "Product weight. . ." },
  { name: "height", label: "Height", placeholder: "Height (cm). . ." },
  { name: "length", label: "Length", placeholder: "Length (cm). . ." },
  { name: "width", label: "Width", placeholder: "Width (cm). . ." },
] as const;

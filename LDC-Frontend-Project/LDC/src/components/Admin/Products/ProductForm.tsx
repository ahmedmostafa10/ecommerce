import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../BreadCrumb";
import GeneralSection from "./form/GeneralSection";
import MediaSection from "./form/MediaSection";
import PricingSection from "./form/PricingSection";
import InventorySection from "./form/InventorySection";
import ShippingSection from "./form/ShippingSection";
import OrganizeSection from "./form/OrganizeSection";
import FormActions from "./form/FormActions";
import {
  useProductForm,
  type ProductFormInitialState,
} from "./form/useProductForm";
import {
  createProduct,
  updateProduct,
  type ProductRequest,
} from "../../../services/products";

type Props = {
  productId?: string;
  initial?: ProductFormInitialState;
};

export default function ProductForm({ productId, initial }: Props) {
  const navigate = useNavigate();
  const isEdit = Boolean(productId);

  const {
    data,
    cover,
    gallery,
    completion,
    uploadProgress,
    handleChange,
    setCoverImage,
    removeCover,
    addGalleryImages,
    removeGalleryImage,
    uploadAllImages,
  } = useProductForm(initial);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const { coverUrl, galleryUrls } = await uploadAllImages();

      const payload: ProductRequest = {
        name: data.name,
        description: data.description,
        amount: Number(data.basePrice) || 0,
        type: data.category,
        stockQuantity: Number(data.quantity) || 0,
        status: data.status === "Out of Stock" ? "OutOfStock" : "InStock",
        sku: data.sku,
        discountType: data.discountType,
        discountPercentage: Number(data.discountPercentage) || 0,
        taxClass: data.taxClass,
        vatAmount: Number(data.vatAmount) || 0,
        isPhysical: data.isPhysical,
        weight: data.weight,
        height: data.height,
        length: data.length,
        width: data.width,
        coverImageUrl: coverUrl,
        productImages: galleryUrls.map((url) => ({ url })),
      };

      if (productId) {
        await updateProduct(productId, payload);
      } else {
        await createProduct(payload);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Could not ${isEdit ? "update" : "save"} the product. Please try again.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  const title = isEdit ? "Edit Product" : "Add Product";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-full flex-col bg-slate-50/50"
    >
      <div className="px-8 pb-4 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <BreadCrumb
          items={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Product List", href: "/admin/products" },
            { label: title },
          ]}
          className="!px-0 !py-1"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mx-8 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      <div className="grid flex-1 grid-cols-1 gap-8 px-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <GeneralSection data={data} onChange={handleChange} />
          <MediaSection
            cover={cover}
            gallery={gallery}
            onSetCover={setCoverImage}
            onRemoveCover={removeCover}
            onAddGallery={addGalleryImages}
            onRemoveGallery={removeGalleryImage}
          />
          <PricingSection data={data} onChange={handleChange} />
          <InventorySection data={data} onChange={handleChange} />
          <ShippingSection data={data} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-6">
          <OrganizeSection data={data} onChange={handleChange} />
        </div>
      </div>

      <FormActions
        completion={completion}
        submitting={submitting}
        uploadProgress={uploadProgress}
        submitLabel={isEdit ? "Save Changes" : "Save"}
        onCancel={() => navigate("/admin/products")}
      />
    </form>
  );
}

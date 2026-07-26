import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { uploadImages } from "../../../../services/cloudinary";
import { TAX_CLASS_RATES } from "./options";

export type ProductStatus =
  | "Draft"
  | "Published"
  | "Low Stock"
  | "Out of Stock";

export type ProductFormData = {
  name: string;
  description: string;
  basePrice: string;
  discountType: string;
  discountPercentage: string;
  taxClass: string;
  vatAmount: string;
  sku: string;
  quantity: string;
  isPhysical: boolean;
  weight: string;
  height: string;
  length: string;
  width: string;
  category: string;
  status: ProductStatus;
};

const INITIAL_DATA: ProductFormData = {
  name: "",
  description: "",
  basePrice: "",
  discountType: "",
  discountPercentage: "",
  taxClass: "",
  vatAmount: "",
  sku: "",
  quantity: "",
  isPhysical: true,
  weight: "",
  height: "",
  length: "",
  width: "",
  category: "",
  status: "Draft",
};

const TRACKED_FIELDS = [
  "name",
  "description",
  "basePrice",
  "sku",
  "quantity",
  "category",
] as const;

export type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type ProductImage = {
  id: string;
  src: string;
  file?: File;
  url?: string;
};
export const MAX_GALLERY_IMAGES = 5;

export type UploadedImages = {
  coverUrl: string | undefined;
  galleryUrls: string[];
};

function toProductImage(file: File, id: number): ProductImage {
  return {
    id: `image-${id}`,
    src: URL.createObjectURL(file),
    file,
  };
}

export type ProductFormInitialState = {
  data: ProductFormData;
  coverUrl?: string;
  galleryUrls: string[];
};

export function useProductForm(initial?: ProductFormInitialState) {
  const [data, setData] = useState<ProductFormData>(
    initial?.data ?? INITIAL_DATA,
  );
  const [cover, setCover] = useState<ProductImage | null>(
    initial?.coverUrl
      ? { id: "cover-existing", src: initial.coverUrl, url: initial.coverUrl }
      : null,
  );
  const [gallery, setGallery] = useState<ProductImage[]>(
    (initial?.galleryUrls ?? []).map((url, index) => ({
      id: `gallery-existing-${index}`,
      src: url,
      url,
    })),
  );
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const nextId = useRef(0);

  function handleChange(e: FieldChangeEvent) {
    const { name, value, type } = e.target;
    const next =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setData((prev) => {
      const updated = { ...prev, [name]: next };

      if (name === "taxClass") {
        updated.vatAmount =
          value in TAX_CLASS_RATES ? String(TAX_CLASS_RATES[value]) : "";
      }

      if (name === "discountType" && value === "") {
        updated.discountPercentage = "";
      }

      return updated;
    });
  }

  function setCoverImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    nextId.current += 1;
    const next = toProductImage(file, nextId.current);
    setCover((prev) => {
      if (prev?.file) URL.revokeObjectURL(prev.src);
      return next;
    });
  }

  function removeCover() {
    setCover((prev) => {
      if (prev?.file) URL.revokeObjectURL(prev.src);
      return null;
    });
  }

  function addGalleryImages(files: FileList | File[]) {
    const incoming = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (incoming.length === 0) return;

    const room = MAX_GALLERY_IMAGES - gallery.length;
    if (room <= 0) return;
    const accepted = incoming.slice(0, room).map((file) => {
      nextId.current += 1;
      return toProductImage(file, nextId.current);
    });

    setGallery((prev) => [...prev, ...accepted]);
  }

  function removeGalleryImage(id: string) {
    setGallery((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target?.file) URL.revokeObjectURL(target.src);
      return prev.filter((image) => image.id !== id);
    });
  }

  async function uploadAllImages(): Promise<UploadedImages> {
    const ordered = [cover, ...gallery].filter(
      (image): image is ProductImage => image !== null,
    );
    if (ordered.length === 0) return { coverUrl: undefined, galleryUrls: [] };

    const pending = ordered.filter((image) => image.file);

    setUploadProgress(pending.length > 0 ? 0 : null);
    try {
      const uploaded =
        pending.length > 0
          ? await uploadImages(
              pending.map((image) => image.file as File),
              setUploadProgress,
            )
          : [];

      const uploadedByeId = new Map(
        pending.map((image, index) => [image.id, uploaded[index].url]),
      );

      const urls = ordered.map(
        (image) => image.url ?? uploadedByeId.get(image.id) ?? "",
      );

      return cover
        ? { coverUrl: urls[0], galleryUrls: urls.slice(1) }
        : { coverUrl: undefined, galleryUrls: urls };
    } finally {
      setUploadProgress(null);
    }
  }

  const completion = useMemo(() => {
    const filled = TRACKED_FIELDS.filter(
      (field) => data[field].trim() !== "",
    ).length;
    const total = TRACKED_FIELDS.length + 1; // + media (cover)
    return Math.round(((filled + (cover ? 1 : 0)) / total) * 100);
  }, [data, cover]);

  return {
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
  };
}

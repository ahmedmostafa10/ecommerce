import { useState } from "react";
import { Upload, X } from "lucide-react";
import FormCard from "../../../ui/FormCard";
import Lightbox from "../../../ui/Lightbox";
import { MAX_GALLERY_IMAGES, type ProductImage } from "./useProductForm";

type Props = {
  cover: ProductImage | null;
  gallery: ProductImage[];
  onSetCover: (file: File) => void;
  onRemoveCover: () => void;
  onAddGallery: (files: FileList | File[]) => void;
  onRemoveGallery: (id: string) => void;
};

const DROP_ZONE =
  "relative flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition";

function UploadPrompt({ label }: { label: string }) {
  return (
    <>
      <div className="mb-3 rounded-full bg-violet-50 p-3 text-violet-500">
        <Upload size={20} />
      </div>
      <p className="mb-1 text-sm text-gray-500">
        Drag and drop here, or click to browse
      </p>
      <span className="mt-3 rounded-lg bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-600">
        {label}
      </span>
    </>
  );
}

export default function MediaSection({
  cover,
  gallery,
  onSetCover,
  onRemoveCover,
  onAddGallery,
  onRemoveGallery,
}: Props) {
  const [dragging, setDragging] = useState<"cover" | "gallery" | null>(null);

  const [preview, setPreview] = useState<number | null>(null);

  const galleryFull = gallery.length >= MAX_GALLERY_IMAGES;
  const lightboxImages = [cover, ...gallery].filter(
    (image): image is ProductImage => image !== null,
  );

  return (
    <FormCard title="Media">
      <div className="flex flex-col gap-6">
        {/* ── Cover ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Cover Image</span>

          {cover ? (
            <div className="group relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-4">
              <img
                src={cover.src}
                alt="Cover"
                onClick={() => setPreview(0)}
                className="max-h-[200px] cursor-zoom-in rounded-lg object-contain"
              />
              <button
                type="button"
                onClick={onRemoveCover}
                aria-label="Remove cover image"
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-red-500 shadow-sm transition hover:bg-red-50"
              >
                <X size={16} />
              </button>
              <span className="absolute bottom-3 left-3 rounded bg-violet-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                Cover
              </span>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging("cover");
              }}
              onDragLeave={() => setDragging(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(null);
                const file = e.dataTransfer.files?.[0];
                if (file) onSetCover(file);
              }}
              className={`${DROP_ZONE} min-h-[180px] ${
                dragging === "cover"
                  ? "border-violet-400 bg-violet-50/50"
                  : "border-gray-200 bg-gray-50/30 hover:bg-gray-50/50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                aria-label="Add cover image"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onSetCover(file);
                  e.target.value = "";
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <UploadPrompt label="Add Cover" />
            </div>
          )}
        </div>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Other Images
            </span>
            <span className="text-xs text-gray-400">
              {gallery.length} / {MAX_GALLERY_IMAGES}
            </span>
          </div>

          {gallery.length > 0 && (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {gallery.map((image, index) => (
                <li
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <button
                    type="button"
                    // +1 because index 0 in the lightbox is the cover.
                    onClick={() => setPreview(cover ? index + 1 : index)}
                    aria-label={`View image ${index + 1}`}
                    className="h-full w-full cursor-zoom-in"
                  >
                    <img
                      src={image.src}
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover transition group-hover:brightness-90"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveGallery(image.id)}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 text-red-500 shadow-sm transition hover:bg-red-50"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!galleryFull ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging("gallery");
              }}
              onDragLeave={() => setDragging(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(null);
                if (e.dataTransfer.files.length)
                  onAddGallery(e.dataTransfer.files);
              }}
              className={`${DROP_ZONE} min-h-[130px] ${
                dragging === "gallery"
                  ? "border-violet-400 bg-violet-50/50"
                  : "border-gray-200 bg-gray-50/30 hover:bg-gray-50/50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                aria-label="Add other images"
                onChange={(e) => {
                  if (e.target.files?.length) onAddGallery(e.target.files);
                  e.target.value = "";
                }}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <UploadPrompt label="Add Images" />
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Maximum of {MAX_GALLERY_IMAGES} images reached. Remove one to add
              another.
            </p>
          )}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        index={preview}
        onClose={() => setPreview(null)}
        onNavigate={setPreview}
      />
    </FormCard>
  );
}

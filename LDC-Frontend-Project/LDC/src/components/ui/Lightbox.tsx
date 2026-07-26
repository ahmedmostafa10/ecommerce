import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ChevronLeftIcon from "../../assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../assets/icons/ChevronRightIcon";

type LightboxProps = {
  images: { id: string; src: string }[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const CONTROL =
  "rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20";

export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = index !== null && images.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index! + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((index! - 1 + images.length) % images.length);
    }

    // Stop the page behind the overlay from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const current = images[index];
  if (!current) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="absolute right-4 top-4 flex items-center gap-3">
        <span className="text-sm font-medium text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className={CONTROL}
        >
          <X size={20} />
        </button>
      </div>

      {images.length > 1 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index - 1 + images.length) % images.length);
          }}
          className={`absolute left-4 ${CONTROL}`}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}

      <img
        src={current.src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />

      {images.length > 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index + 1) % images.length);
          }}
          className={`absolute right-4 ${CONTROL}`}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>,
    document.body,
  );
}

import { useState } from "react";
import tshirtFront from "../../assets/categories/Tshirt.webp";
import tshirtBack from "../../assets/categories/image.png";
import tshirtModel from "../../assets/categories/Polo.webp";

const DEFAULT_IMAGES = [tshirtFront, tshirtBack, tshirtModel];

type ProductGalleryProps = {
  images?: string[];
  alt?: string;
  className?: string;
};

export default function ProductGallery({
  images = DEFAULT_IMAGES,
  alt = "Product image",
  className = "",
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];

  return (
    <div className={`flex gap-4 sm:gap-5 justify-center ${className}`}>
      <div className="flex shrink-0 flex-col gap-3">
        {images.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={isSelected}
              className={`overflow-hidden rounded-2xl bg-neutral-100 transition ${
                isSelected
                  ? "ring-2 ring-[var(--brand)] ring-offset-2"
                  : "ring-1 ring-transparent hover:ring-neutral-200"
              }`}
            >
              <img
                src={image}
                alt=""
                className="aspect-square h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
              />
            </button>
          );
        })}
      </div>

      <div className="min-w-0 sm:flex overflow-hidden rounded-[20px] bg-neutral-100">
        <div className="flex aspect-[6/5] max-h-[420px] items-center justify-center p-5 sm:max-h-[460px] sm:p-8">
          <img
            src={selectedImage}
            alt={alt}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

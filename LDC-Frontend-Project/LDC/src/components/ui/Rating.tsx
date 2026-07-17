const STAR_SIZES = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
} as const;

type RatingProps = {
  value: number;
  size?: keyof typeof STAR_SIZES;
  className?: string;
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Rating({
  value,
  size = "sm",
  className = "",
}: RatingProps) {
  const clamped = Math.min(5, Math.max(0, value));
  const starSize = STAR_SIZES[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const fill = Math.min(1, Math.max(0, clamped - index));

          if (fill >= 1) {
            return (
              <StarIcon key={index} className={`${starSize} text-amber-400`} />
            );
          }

          if (fill > 0) {
            return (
              <span key={index} className={`relative ${starSize}`}>
                <StarIcon
                  className={`absolute inset-0 ${starSize} text-neutral-200`}
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <StarIcon className={`${starSize} text-amber-400`} />
                </span>
              </span>
            );
          }

          return (
            <StarIcon key={index} className={`${starSize} text-neutral-200`} />
          );
        })}
      </div>
      <span className="text-sm text-neutral-500">
        {clamped % 1 === 0 ? clamped : clamped.toFixed(1)}/5
      </span>
    </div>
  );
}

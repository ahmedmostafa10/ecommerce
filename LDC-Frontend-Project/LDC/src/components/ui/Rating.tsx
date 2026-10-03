import StarIcon from "../../assets/icons/StarIcon";

const STAR_SIZES = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
} as const;

type RatingProps = {
  value: number;
  size?: keyof typeof STAR_SIZES;
  className?: string;
};

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

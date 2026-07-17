type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "default" | "sm";
  className?: string;
};

const SIZE_STYLES = {
  default: {
    container: "h-14 px-5",
    button: "text-2xl",
    value: "min-w-8 text-xl",
  },
  sm: {
    container: "h-11 px-3",
    button: "text-lg",
    value: "min-w-6 text-sm",
  },
} as const;

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "default",
  className = "",
}: QuantitySelectorProps) {
  const styles = SIZE_STYLES[size];

  const decrease = () => {
    onChange(Math.max(min, value - 1));
  };

  const increase = () => {
    onChange(Math.min(max, value + 1));
  };

  return (
    <div
      className={`flex items-center justify-between rounded-full bg-neutral-100 sm:w-full ${styles.container} ${className}`}
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`font-light text-neutral-500 transition hover:text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-40 ${styles.button}`}
      >
        −
      </button>
      <span
        className={`text-center font-medium text-[var(--brand)] ${styles.value}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`font-light text-neutral-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-40 ${styles.button}`}
      >
        +
      </button>
    </div>
  );
}

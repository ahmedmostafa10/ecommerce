import QuantitySelector from "../ui/QuantitySelector";
import TrashIcon from "../../assets/icons/TrashIcon";

export type CartItemData = {
  id: string;
  image: string;
  title: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

type CartItemProps = {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isLast?: boolean;
};

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
  isLast = false,
}: CartItemProps) {
  return (
    <article
      className={`flex gap-4 py-5 sm:gap-5 sm:py-6 ${isLast ? "" : "border-b border-neutral-200"}`}
    >
      <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[20px] bg-neutral-100 sm:h-[124px] sm:w-[124px]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-black sm:text-lg">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Size:{" "}
            <span className="text-neutral-500">{item.size}</span>
          </p>
          <p className="mt-0.5 text-sm text-neutral-500 sm:text-base">
            Color:{" "}
            <span className="text-neutral-500">{item.color}</span>
          </p>
          <p className="mt-3 text-xl font-bold text-black sm:mt-4">
            ${item.price}
          </p>
        </div>

        <div className="mt-4 flex shrink-0 flex-col items-end justify-between gap-4 sm:mt-0 sm:min-h-[124px]">
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.title} from cart`}
            className="shrink-0 text-[#ff3333] transition hover:opacity-70"
          >
            <TrashIcon className="h-[18px] w-[18px]" />
          </button>

          <QuantitySelector
            value={item.quantity}
            onChange={(quantity) => onQuantityChange(item.id, quantity)}
            size="sm"
            className="w-[88px] sm:w-auto"
          />
        </div>
      </div>
    </article>
  );
}

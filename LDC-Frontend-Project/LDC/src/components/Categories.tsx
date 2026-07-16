import Tag from "./Tag";
import tshirtImg from "../assets/categories/Tshirt.webp";
import shirtsImg from "../assets/categories/shirt.webp";
import poloImg from "../assets/categories/Polo.webp";
import pantsImg from "../assets/categories/pants.webp";
import jeansImg from "../assets/categories/jeans.webp";
import sneakersImg from "../assets/categories/shoes.webp";

type Category = {
  name: string;
  image: string;
  slug: string;
};

const CATEGORIES: Category[] = [
  { name: "Tshirt", image: tshirtImg, slug: "tshirt" },
  { name: "Shirts", image: shirtsImg, slug: "shirts" },
  { name: "Polo", image: poloImg, slug: "polo" },
  { name: "Pants", image: pantsImg, slug: "pants" },
  { name: "Jeans", image: jeansImg, slug: "jeans" },
  { name: "Sneakers", image: sneakersImg, slug: "sneakers" },
];

type CategoriesProps = {
  onSelect?: (slug: string) => void;
};

export default function Categories({ onSelect }: CategoriesProps) {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Tag tag="CATEGORIES" />

        <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => onSelect?.(category.slug)}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#eeeeee_0%,_#f8f8f8_45%,_transparent_72%)]" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="relative z-10 h-[78%] w-[78%] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-[var(--brand)] decoration-[var(--brand)] underline-offset-4 transition-all group-hover:underline sm:text-base">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

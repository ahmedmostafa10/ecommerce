import type { FooterColumn } from "./types";

export default function LinkColumn({ title, links }: FooterColumn) {
  return (
    <nav className="flex flex-col gap-4">
      <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-900">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { Fragment } from "react";
import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadCrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 text-neutral-400"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function BreadCrumb({ items, className = "" }: BreadCrumbProps) {
  return (
    <div
      className={`mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8 ${className}`}
    >
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <ChevronIcon />}
              {isLast || !item.href ? (
                <span className="font-normal text-[var(--brand)]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="font-normal text-neutral-400 transition hover:text-neutral-600"
                >
                  {item.label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}

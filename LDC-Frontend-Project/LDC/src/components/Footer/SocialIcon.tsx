import type { SocialLink } from "./types";

export default function SocialIcon({ label, href, icon }: SocialLink) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
    >
      {icon}
    </a>
  );
}

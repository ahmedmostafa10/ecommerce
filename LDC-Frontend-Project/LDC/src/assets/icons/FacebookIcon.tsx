import type { SVGProps } from "react";

export default function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 13.5h2.5l1-4H14V7c0-1.03 0-2 2-2h1.5V1.64C17.17 1.6 15.92 1.5 14.6 1.5c-2.76 0-4.6 1.68-4.6 4.77V9.5H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

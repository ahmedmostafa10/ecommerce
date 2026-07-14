export default function Logo({ className = "" }) {
  return (
    <img
      src="/logo-primary.webp"
      alt="LDC"
      className={`h-10 w-auto ${className}`}
    />
  );
}

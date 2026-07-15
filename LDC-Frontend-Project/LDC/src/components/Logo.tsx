import logo from "../assets/LDC_Primary.webp";
import logo_small from "../assets/LDC_Primary_Small.webp";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src={logo_small}
        alt="LDC"
        className={`w-12 h-auto sm:hidden ${className}`}
      />
      <img
        src={logo}
        alt="LDC"
        className={`w-48 h-auto hidden sm:block ${className}`}
      />
    </>
  );
}

import logo from "../assets/LDC_Primary.webp";

export default function Logo({ className = "" }: { className?: string }) {
  return <img src={logo} alt="LDC" className={`w-48 h-auto ${className} `} />;
}

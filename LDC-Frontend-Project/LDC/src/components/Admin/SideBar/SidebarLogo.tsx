import logo from "../../../assets/LDC_Primary.webp";
import logosmall from "../../../assets/LDC_Primary_small.webp";

export default function SidebarLogo() {
  return (
    <div className="flex items-center justify-center px-3 py-6 sm:justify-start sm:px-6">
      <img src={logo} alt="LDC" className="hidden h-9 sm:block" />
      <img src={logosmall} alt="LDC" className="h-8 sm:hidden" />
    </div>
  );
}

import Logo from "../Logo";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-white px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

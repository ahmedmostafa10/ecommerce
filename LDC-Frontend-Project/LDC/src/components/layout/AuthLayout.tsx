import type { ReactNode } from "react";
import Logo from "../Logo";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-white px-4 py-16 mt-20">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-5 text-2xl font-bold text-[var(--brand)]">
            {title}
          </h1>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

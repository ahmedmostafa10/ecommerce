import type { ReactNode } from "react";

type FormCardProps = {
  title: string;
  children: ReactNode;
  aside?: ReactNode;
};

export default function FormCard({ title, children, aside }: FormCardProps) {
  return (
    <div className="relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {aside && <div className="absolute right-6 top-6">{aside}</div>}
      <h2 className="mb-5 text-base font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}

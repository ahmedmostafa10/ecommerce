export default function Tag({ tag }: { tag: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-12">
      <div className="h-px flex-1 bg-neutral-200" />
      <h2 className="shrink-0 text-base font-bold tracking-[0.2em] text-[var(--brand)] sm:text-lg">
        {tag}
      </h2>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

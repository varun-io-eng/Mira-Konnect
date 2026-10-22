export function PortalPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-10 border-b border-mk-navy/10 pb-8">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-mk-teal">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold text-mk-navy sm:text-[2rem]">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-mk-slate">{description}</p>
      ) : null}
    </header>
  );
}

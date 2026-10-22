import { parseJobBullets } from "@/lib/jobs/display";

export function JobJdSection({
  title,
  body,
  icon,
}: {
  title: string;
  body: string | null | undefined;
  icon?: React.ReactNode;
}) {
  const bullets = parseJobBullets(body);
  if (!body?.trim()) return null;

  return (
    <section className="rounded-2xl border border-mk-navy/[0.08] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2">
        {icon ? <span className="text-mk-teal">{icon}</span> : null}
        <h2 className="font-display text-xl font-semibold text-mk-navy">{title}</h2>
      </div>
      {bullets.length > 1 ? (
        <ul className="mt-5 space-y-3">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-mk-slate sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mk-teal" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-mk-slate sm:text-base whitespace-pre-wrap">
          {body.trim()}
        </p>
      )}
    </section>
  );
}

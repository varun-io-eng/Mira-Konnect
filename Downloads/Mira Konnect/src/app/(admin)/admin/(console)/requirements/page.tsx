import { prisma } from "@/lib/db";

export const metadata = { title: "Hiring requirements" };

export default async function AdminRequirementsPage() {
  const reqs = await prisma.hiringRequirement.findMany({
    include: { employer: { include: { company: true, user: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Employer requirements</h1>
      <ul className="mt-6 space-y-4">
        {reqs.map((r) => (
          <li key={r.id} className="rounded-xl border bg-white p-4 text-sm">
            <p className="font-semibold">{r.title}</p>
            <p className="text-mk-muted">
              {r.employer.company?.name ?? r.employer.user.name} · {r.status}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

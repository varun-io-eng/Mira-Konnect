import { prisma } from "@/lib/db";

export const metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  const [jobs, applications, leads, requirements] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.contactLead.count(),
    prisma.hiringRequirement.count(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Operations overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Jobs", value: jobs },
          { label: "Applications", value: applications },
          { label: "Contact leads", value: leads },
          { label: "Hiring reqs", value: requirements },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-mk-navy/10 bg-white p-5">
            <p className="text-2xl font-semibold text-mk-teal">{s.value}</p>
            <p className="text-sm text-mk-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

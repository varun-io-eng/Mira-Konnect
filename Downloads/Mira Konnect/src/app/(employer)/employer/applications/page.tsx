import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";

export const metadata = { title: "Applications" };

export default async function EmployerApplicationsPage() {
  const user = await getCurrentUser();
  const apps = user?.employer
    ? await prisma.application.findMany({
        where: { employerId: user.employer.id },
        include: { job: true, candidate: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">Applications</h1>
      {apps.length === 0 ? (
        <p className="mt-4 text-mk-slate">No applications linked to your jobs yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {apps.map((app) => (
            <li key={app.id} className="rounded-xl border border-mk-navy/10 bg-white p-4">
              <p className="font-semibold">{app.candidate.user.name}</p>
              <p className="text-sm text-mk-muted">{app.job.title}</p>
              <p className="mt-2 text-xs font-semibold uppercase text-mk-teal">{app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Employer dashboard" };

export default async function EmployerDashboardPage() {
  const user = await getCurrentUser();
  const reqs = user?.employer
    ? await prisma.hiringRequirement.count({ where: { employerId: user.employer.id } })
    : 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-mk-navy">
        {user?.employer?.company?.name ?? "Your company"}
      </h1>
      <p className="mt-2 text-mk-slate">Submit mandates and review candidate pipeline.</p>
      <div className="mt-8 rounded-2xl border border-mk-navy/10 bg-white p-6">
        <p className="text-3xl font-semibold text-mk-teal">{reqs}</p>
        <p className="text-sm text-mk-muted">Hiring requirements on file</p>
        <Button href="/employer/requirements" className="mt-4" size="sm">
          Manage requirements
        </Button>
      </div>
    </div>
  );
}

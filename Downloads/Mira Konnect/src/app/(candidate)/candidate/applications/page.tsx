import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PortalPageHeader } from "@/components/candidate/portal-page-header";
import { ApplicationCard } from "@/components/candidate/application-card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "My applications" };

export default async function CandidateApplicationsPage() {
  const user = await getCurrentUser();
  const applications = user?.candidate
    ? await prisma.application.findMany({
        where: { candidateId: user.candidate.id },
        include: { job: true, interviews: { orderBy: { scheduledAt: "asc" } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div>
      <PortalPageHeader
        eyebrow="Your pipeline"
        title="Applications"
        description="Every role you have applied for through Mira Konnect—status updates and interview details in one place."
      />

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-mk-navy/10 bg-white p-10 text-center shadow-sm">
          <p className="font-display text-lg font-semibold text-mk-navy">No applications yet</p>
          <p className="mt-2 text-sm text-mk-slate">
            When you apply from a job page, your progress will show here.
          </p>
          <Button href="/jobs" className="mt-6">Find roles to apply</Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id}>
              <ApplicationCard application={app} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-center text-sm text-mk-muted">
        Questions about a role?{" "}
        <Link href="/contact" className="font-semibold text-mk-teal hover:underline">
          Contact our HR team
        </Link>
      </p>
    </div>
  );
}

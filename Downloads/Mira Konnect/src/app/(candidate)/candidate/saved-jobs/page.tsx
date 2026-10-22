import { JobStatus } from "@prisma/client";
import { JobCard } from "@/components/jobs/job-card";
import { PortalPageHeader } from "@/components/candidate/portal-page-header";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Saved jobs" };

export default async function SavedJobsPage() {
  const user = await getCurrentUser();
  const saved = user?.candidate
    ? await prisma.savedJob.findMany({
        where: { candidateId: user.candidate.id },
        include: { job: { include: { industry: true, skills: true } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const jobs = saved.map((s) => s.job).filter((j) => j.status === JobStatus.PUBLISHED);

  return (
    <div>
      <PortalPageHeader
        eyebrow="Shortlist"
        title="Saved jobs"
        description="Roles you bookmarked while browsing—apply when you're ready."
      />

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-mk-navy/10 bg-white p-10 text-center shadow-sm">
          <p className="font-display text-lg font-semibold text-mk-navy">Nothing saved yet</p>
          <p className="mt-2 text-sm text-mk-slate">Use “Save job” on any opening to build your shortlist.</p>
          <Button href="/jobs" className="mt-6" variant="outline">Browse openings</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} variant="rich" />
          ))}
        </div>
      )}
    </div>
  );
}

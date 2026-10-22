import Link from "next/link";
import { FileText, Bookmark, Briefcase, Sparkles } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PortalPageHeader } from "@/components/candidate/portal-page-header";
import { ApplicationStatusBadge } from "@/components/jobs/application-status-badge";

export const metadata = { title: "Candidate dashboard" };

export default async function CandidateDashboardPage() {
  const user = await getCurrentUser();
  const candidateId = user?.candidate?.id;

  const [appCount, savedCount, recentApps, resumeCount] = candidateId
    ? await Promise.all([
        prisma.application.count({ where: { candidateId } }),
        prisma.savedJob.count({ where: { candidateId } }),
        prisma.application.findMany({
          where: { candidateId },
          include: { job: true },
          orderBy: { createdAt: "desc" },
          take: 3,
        }),
        prisma.resume.count({ where: { candidateId } }),
      ])
    : [0, 0, [], 0];

  return (
    <div>
      <PortalPageHeader
        eyebrow="Candidate portal"
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        description="Track applications, keep your profile sharp, and discover roles matched to your experience."
      />

      {resumeCount === 0 ? (
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Sparkles className="h-6 w-6 shrink-0 text-amber-600" aria-hidden />
            <div>
              <p className="font-semibold text-mk-navy">Complete your profile</p>
              <p className="text-sm text-mk-slate">Upload a resume so recruiters can shortlist you faster.</p>
            </div>
          </div>
          <Button href="/candidate/profile" variant="outline" size="sm">Add resume</Button>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm">
          <Briefcase className="h-5 w-5 text-mk-teal" aria-hidden />
          <p className="mt-3 text-3xl font-semibold text-mk-navy">{appCount}</p>
          <p className="text-sm text-mk-muted">Applications</p>
          <Link href="/candidate/applications" className="mt-4 inline-block text-sm font-semibold text-mk-teal hover:underline">
            View all →
          </Link>
        </div>
        <div className="rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm">
          <Bookmark className="h-5 w-5 text-mk-teal" aria-hidden />
          <p className="mt-3 text-3xl font-semibold text-mk-navy">{savedCount}</p>
          <p className="text-sm text-mk-muted">Saved jobs</p>
          <Link href="/candidate/saved-jobs" className="mt-4 inline-block text-sm font-semibold text-mk-teal hover:underline">
            Open list →
          </Link>
        </div>
        <div className="rounded-2xl border border-mk-navy/10 bg-white p-6 shadow-sm">
          <FileText className="h-5 w-5 text-mk-teal" aria-hidden />
          <p className="mt-3 text-3xl font-semibold text-mk-navy">{resumeCount}</p>
          <p className="text-sm text-mk-muted">Resumes on file</p>
          <Link href="/candidate/profile" className="mt-4 inline-block text-sm font-semibold text-mk-teal hover:underline">
            Manage profile →
          </Link>
        </div>
      </div>

      {recentApps.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-mk-navy">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {recentApps.map((app) => (
              <li
                key={app.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-mk-navy/10 bg-white px-4 py-3"
              >
                <div>
                  <Link href={`/jobs/${app.job.slug}`} className="font-medium text-mk-navy hover:text-mk-teal">
                    {app.job.title}
                  </Link>
                  <p className="text-xs text-mk-muted">{app.job.location}</p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-mk-teal/30 bg-mk-teal/[0.04] p-8 text-center">
          <p className="font-display text-lg font-semibold text-mk-navy">Start your search</p>
          <p className="mt-2 text-sm text-mk-slate">Explore curated openings across pharmaceuticals, IT, hospitality, and more.</p>
          <Button href="/jobs" className="mt-4">Browse job openings</Button>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Industry, Job } from "@prisma/client";
import { JobDetailApplyBlock, type ApplyFormPrefill } from "@/components/jobs/job-detail-apply-block";
import { formatEmploymentType } from "@/lib/jobs/display";

type RelatedJob = Pick<Job, "id" | "slug" | "title" | "location" | "employmentType"> & {
  industry: Industry | null;
};

export function JobDetailSidebar({
  jobId,
  jobSlug,
  jobTitle,
  applicationDeadline,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
  related,
  prefill,
}: {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  applicationDeadline: Date | null;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
  related: RelatedJob[];
  prefill: ApplyFormPrefill;
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <JobDetailApplyBlock
        jobId={jobId}
        jobSlug={jobSlug}
        jobTitle={jobTitle}
        applicationDeadline={applicationDeadline?.toISOString() ?? null}
        isLoggedInCandidate={isLoggedInCandidate}
        hasResume={hasResume}
        hasApplied={hasApplied}
        prefill={prefill}
      />

      {related.length > 0 ? (
        <div className="rounded-xl border border-mk-navy/10 bg-white p-5 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-mk-navy">More jobs</h3>
          <ul className="mt-4 divide-y divide-mk-navy/8">
            {related.map((j) => (
              <li key={j.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/jobs/${j.slug}`}
                  className="font-semibold text-[#1e4d7b] hover:text-mk-teal"
                >
                  {j.title}
                </Link>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-mk-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {j.location}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase text-mk-slate">
                  {formatEmploymentType(j.employmentType)}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/jobs" className="mt-4 inline-block text-sm font-semibold text-mk-teal hover:underline">
            View all openings
          </Link>
        </div>
      ) : null}
    </aside>
  );
}

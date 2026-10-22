"use client";

import { JobJdSection } from "@/components/jobs/job-jd-section";
import type { JobListItem } from "@/components/jobs/jobs-list-types";
import { ApplyForm } from "@/components/forms/apply-form";

type JobInlineApplyPanelProps = {
  job: JobListItem;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
  onClose: () => void;
};

export function JobInlineApplyPanel({
  job,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
  onClose,
}: JobInlineApplyPanelProps) {
  return (
    <div className="border-t border-mk-teal/20 bg-mk-sand/20 px-4 py-6 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-mk-navy">Apply on this page</p>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-mk-teal underline-offset-2 hover:underline"
        >
          Close
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          <JobJdSection title="Job description" body={job.description} />
          {job.responsibilities ? (
            <JobJdSection title="Key responsibilities" body={job.responsibilities} />
          ) : null}
          {job.requirements ? (
            <JobJdSection title="Candidate profile" body={job.requirements} />
          ) : null}
          {job.skills.length > 0 ? (
            <section className="rounded-2xl border border-mk-navy/[0.08] bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-mk-navy">Required skills</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-full bg-mk-sand/80 px-3 py-1 text-sm font-medium text-mk-navy"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="rounded-2xl border border-mk-navy/10 bg-white p-5 shadow-sm">
          {hasApplied ? (
            <p className="text-sm text-mk-slate">
              You have already applied for this role. Track progress in your applications dashboard.
            </p>
          ) : (
            <ApplyForm
              jobId={job.id}
              jobSlug={job.slug}
              jobTitle={job.title}
              isLoggedInCandidate={isLoggedInCandidate}
              hasResume={hasResume}
              showResumeUpload
              loginNext="/jobs"
            />
          )}
        </div>
      </div>
    </div>
  );
}

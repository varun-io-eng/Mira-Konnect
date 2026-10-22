"use client";

import Link from "next/link";
import { Briefcase, MapPin, X } from "lucide-react";
import { ApplyForm } from "@/components/forms/apply-form";
import { JobJdSection } from "@/components/jobs/job-jd-section";
import type { JobListItem } from "@/components/jobs/jobs-list-types";
import {
  formatEmploymentType,
  formatExperience,
} from "@/lib/jobs/display";

type JobListApplyPanelProps = {
  job: JobListItem;
  onClose: () => void;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
};

export function JobListApplyPanel({
  job,
  onClose,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
}: JobListApplyPanelProps) {
  const experience = formatExperience(job);

  return (
    <div className="border-b border-mk-teal/30 bg-gradient-to-b from-mk-sand/40 to-white px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mk-teal">Apply for</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-[#1e4d7b]">{job.title}</h3>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mk-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" aria-hidden />
              {formatEmploymentType(job.employmentType)}
              {experience ? ` · ${experience}` : ""}
            </span>
          </p>
          {job.industry?.name ? (
            <p className="mt-1 text-sm text-mk-slate">Sector: {job.industry.name}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-mk-navy/15 p-2 text-mk-muted hover:bg-white"
          aria-label="Close apply panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="max-h-[min(52vh,480px)] space-y-4 overflow-y-auto pr-1">
          <JobJdSection title="About the role" body={job.description} />
          <JobJdSection title="Responsibilities" body={job.responsibilities} />
          <JobJdSection title="Requirements" body={job.requirements} />
          {job.benefits ? <JobJdSection title="Benefits" body={job.benefits} /> : null}
          {job.skills.length > 0 ? (
            <div className="rounded-xl border border-mk-navy/10 bg-white p-4">
              <h4 className="text-sm font-semibold text-mk-navy">Skills</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-md bg-mk-sand/70 px-2 py-0.5 text-xs font-medium text-mk-navy"
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <Link
            href={`/jobs/${job.slug}`}
            className="text-sm font-semibold text-mk-teal hover:underline"
          >
            View full job page
          </Link>
        </div>

        <div className="rounded-2xl border border-mk-navy/10 bg-white p-5 shadow-sm">
          <h4 className="font-display text-lg font-semibold text-mk-navy">Your application</h4>
          <p className="mt-1 text-sm text-mk-muted">
            Upload your resume and add a short note. Recruiters review every submission personally.
          </p>
          <div className="mt-5">
            {hasApplied ? (
              <p className="rounded-xl border border-mk-teal/25 bg-mk-teal/5 px-4 py-3 text-sm text-mk-navy">
                You have already applied. Track status in your{" "}
                <Link href="/candidate/applications" className="font-semibold text-mk-teal underline">
                  applications dashboard
                </Link>
                .
              </p>
            ) : (
              <ApplyForm
                jobId={job.id}
                jobSlug={job.slug}
                jobTitle={job.title}
                isLoggedInCandidate={isLoggedInCandidate}
                hasResume={hasResume}
                showResumeUpload
                loginNext={`/jobs?apply=${job.slug}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

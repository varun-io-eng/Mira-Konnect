"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JobListingRow } from "@/components/jobs/job-listing-row";
import type { JobListItem, JobsCandidateContext } from "@/components/jobs/jobs-list-types";

export type JobListRowSerialized = JobListItem & { postedAtIso: string };

type JobsResultsPanelProps = {
  jobs: JobListRowSerialized[];
  totalCount: number;
  page: number;
  perPage: number;
  candidate: JobsCandidateContext;
  personalized?: boolean;
};

const PER_PAGE_OPTIONS = [15, 30, 50] as const;

export function JobsResultsPanel({
  jobs,
  totalCount,
  page,
  perPage,
  candidate,
  personalized = false,
}: JobsResultsPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const start = totalCount === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalCount);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key === "perPage") params.delete("page");
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <div className="min-w-0 flex-1 border border-mk-navy/10 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-mk-navy/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="text-sm text-mk-slate">
          <p className="font-semibold text-mk-navy">
            {totalCount} Job{totalCount === 1 ? "" : "s"} Found
          </p>
          <p className="text-mk-muted">
            Displayed here: {start} – {end} job{end === 1 ? "" : "s"}
          </p>
          {personalized ? (
            <p className="mt-2 text-xs text-mk-teal">
              Matched to your search, resume, and career details.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-xs text-mk-muted">
            <span className="sr-only">Sort by</span>
            <select
              className="border border-mk-navy/15 bg-white px-2 py-1.5 text-sm text-mk-navy"
              value={searchParams.get("sort") ?? "recent"}
              onChange={(e) => updateParam("sort", e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="title">Job Title (A–Z)</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-mk-muted">
            <span className="sr-only">Records per page</span>
            <select
              className="border border-mk-navy/15 bg-white px-2 py-1.5 text-sm text-mk-navy"
              value={String(perPage)}
              onChange={(e) => updateParam("perPage", e.target.value)}
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n} per page</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="p-12 text-center text-mk-slate">
          <p>No jobs match your search.</p>
          <p className="mt-2 text-sm text-mk-muted">Try different keywords or clear filters.</p>
        </div>
      ) : (
        <div>
          {jobs.map((job) => (
            <JobListingRow
              key={job.id}
              job={job}
              postedAt={new Date(job.postedAtIso)}
              hasApplied={candidate.appliedJobIds.includes(job.id)}
            />
          ))}
        </div>
      )}

      {totalCount > perPage ? (
        <div className="flex justify-center gap-2 border-t border-mk-navy/10 px-4 py-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => updateParam("page", page <= 2 ? "" : String(page - 1))}
            className="rounded border border-mk-navy/15 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-2 py-1.5 text-sm text-mk-muted">Page {page}</span>
          <button
            type="button"
            disabled={end >= totalCount}
            onClick={() => updateParam("page", String(page + 1))}
            className="rounded border border-mk-navy/15 px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

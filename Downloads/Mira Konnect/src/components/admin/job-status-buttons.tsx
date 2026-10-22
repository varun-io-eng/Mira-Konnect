"use client";

import { JobStatus } from "@prisma/client";
import { setJobStatusAction } from "@/actions/jobs-admin";

export function JobStatusButtons({ jobId, status }: { jobId: string; status: JobStatus }) {
  return (
    <div className="flex flex-wrap gap-2">
      {status !== JobStatus.PUBLISHED && (
        <button
          type="button"
          className="rounded-full bg-mk-teal px-3 py-1 text-xs font-semibold text-white"
          onClick={() => setJobStatusAction(jobId, JobStatus.PUBLISHED)}
        >
          Publish
        </button>
      )}
      {status === JobStatus.PUBLISHED && (
        <button
          type="button"
          className="rounded-full border px-3 py-1 text-xs font-semibold"
          onClick={() => setJobStatusAction(jobId, JobStatus.CLOSED)}
        >
          Close
        </button>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { JobApplicationModal } from "@/components/jobs/job-application-modal";

export type ApplyFormPrefill = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentJobTitle: string;
  currentSalary: string;
  address: string;
};

type JobDetailApplyBlockProps = {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  applicationDeadline: string | null;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
  prefill: ApplyFormPrefill;
};

export function JobDetailApplyBlock({
  jobId,
  jobSlug,
  jobTitle,
  applicationDeadline,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
  prefill,
}: JobDetailApplyBlockProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => {
    setOpen(false);
    if (searchParams.get("apply") === "1") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("apply");
      const q = params.toString();
      router.replace(q ? `/jobs/${jobSlug}?${q}` : `/jobs/${jobSlug}`, { scroll: false });
    }
  }, [jobSlug, router, searchParams]);

  useEffect(() => {
    if (searchParams.get("apply") === "1" && !hasApplied) {
      setOpen(true);
    }
  }, [searchParams, hasApplied]);

  const deadlineLabel = applicationDeadline
    ? new Date(applicationDeadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-mk-navy/10 bg-white shadow-sm">
        <button
          type="button"
          onClick={openModal}
          disabled={hasApplied}
          className="block w-full bg-[#22a06b] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#1d8a5c] disabled:cursor-not-allowed disabled:bg-mk-sand disabled:text-mk-muted"
        >
          {hasApplied ? "Already applied" : "Apply for the job"}
        </button>
        {deadlineLabel ? (
          <p className="px-4 py-3 text-center text-xs text-mk-muted">
            Applications accepted until {deadlineLabel}
          </p>
        ) : (
          <p className="px-4 py-3 text-center text-xs text-mk-muted">
            We review applications on a rolling basis
          </p>
        )}
      </div>

      <JobApplicationModal
        open={open}
        onClose={closeModal}
        jobId={jobId}
        jobSlug={jobSlug}
        jobTitle={jobTitle}
        isLoggedInCandidate={isLoggedInCandidate}
        hasResume={hasResume}
        hasApplied={hasApplied}
        prefill={prefill}
      />
    </>
  );
}

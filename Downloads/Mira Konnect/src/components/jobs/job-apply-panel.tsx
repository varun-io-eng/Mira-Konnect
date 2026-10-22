import { CheckCircle2, FileText, Shield } from "lucide-react";
import { ApplyForm } from "@/components/forms/apply-form";

export function JobApplyPanel({
  jobId,
  jobSlug,
  jobTitle,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
  showResumeUpload = false,
}: {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
  showResumeUpload?: boolean;
}) {
  return (
    <div
      id="apply"
      className="overflow-hidden rounded-2xl border border-mk-navy/10 bg-gradient-to-b from-white to-mk-sand/40 shadow-lg shadow-mk-navy/[0.06] ring-1 ring-mk-navy/[0.04]"
    >
      <div className="border-b border-mk-navy/8 bg-mk-navy px-6 py-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#99f6e4]">
          Ready to apply?
        </p>
        <h2 className="mt-1 font-display text-xl font-semibold">Submit your profile</h2>
        <p className="mt-2 text-sm text-white/75">
          One thoughtful application—reviewed by Mira Konnect recruiters, not lost in a black hole.
        </p>
      </div>

      <div className="space-y-4 px-6 py-5">
        <ul className="space-y-2.5 text-sm text-mk-slate">
          <li className="flex gap-2">
            <Shield className="h-4 w-4 shrink-0 text-mk-teal" aria-hidden />
            Confidential handling of your details
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-mk-teal" aria-hidden />
            Status updates in your candidate portal
          </li>
          <li className="flex gap-2">
            <FileText className="h-4 w-4 shrink-0 text-mk-teal" aria-hidden />
            {isLoggedInCandidate && !hasResume
              ? "Upload a resume on your profile for a stronger application"
              : "Resume on file is shared with our recruitment team"}
          </li>
        </ul>

        {hasApplied ? (
          <div className="rounded-xl border border-mk-teal/25 bg-mk-teal/5 px-4 py-3 text-sm text-mk-navy">
            You have already applied for this role. Track progress in your applications dashboard.
          </div>
        ) : (
          <ApplyForm
            jobId={jobId}
            jobSlug={jobSlug}
            jobTitle={jobTitle}
            isLoggedInCandidate={isLoggedInCandidate}
            hasResume={hasResume}
            showResumeUpload={showResumeUpload}
          />
        )}
      </div>
    </div>
  );
}

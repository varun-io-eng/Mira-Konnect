"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { applyToJobAction, type ActionResult } from "@/actions/applications";
import { Button } from "@/components/ui/button";

const inputClass =
  "mt-2 w-full rounded-xl border border-mk-navy/12 bg-white px-4 py-3 text-sm text-mk-navy shadow-inner shadow-mk-navy/[0.02] placeholder:text-mk-muted focus:border-mk-teal focus:outline-none focus:ring-2 focus:ring-mk-teal/20";

export function ApplyForm({
  jobId,
  jobSlug,
  jobTitle,
  isLoggedInCandidate,
  hasResume,
  showResumeUpload = false,
  loginNext,
}: {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  isLoggedInCandidate: boolean;
  hasResume?: boolean;
  showResumeUpload?: boolean;
  loginNext?: string;
}) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => applyToJobAction(formData),
    null,
  );
  const [note, setNote] = useState("");

  const signInNext = loginNext ?? `/jobs/${jobSlug}#apply`;

  if (!isLoggedInCandidate) {
    return (
      <div className="rounded-xl border border-dashed border-mk-teal/30 bg-mk-teal/[0.04] p-5">
        <p className="text-sm leading-relaxed text-mk-slate">
          Create a free candidate account to apply for{" "}
          <strong className="text-mk-navy">{jobTitle}</strong>. Your application goes directly to
          Mira Konnect recruiters.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button href={`/login?next=${encodeURIComponent(signInNext)}`} className="gap-1">
            Sign in to apply
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href="/register" variant="outline">Create account</Button>
        </div>
      </div>
    );
  }

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-mk-teal/30 bg-gradient-to-br from-mk-teal/10 to-white p-5">
        <div className="flex gap-3">
          <Sparkles className="h-6 w-6 shrink-0 text-mk-teal" aria-hidden />
          <div>
            <p className="font-display text-lg font-semibold text-mk-navy">Application sent</p>
            <p className="mt-1 text-sm leading-relaxed text-mk-slate">
              Thank you for applying. We will review your profile and update you in your{" "}
              <Link href="/candidate/applications" className="font-semibold text-mk-teal underline">
                applications dashboard
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-4"
      encType={showResumeUpload ? "multipart/form-data" : undefined}
    >
      <input type="hidden" name="jobId" value={jobId} />
      {state && !state.ok ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {state.error}
        </p>
      ) : null}

      {showResumeUpload ? (
        <div>
          <label className="text-sm font-semibold text-mk-navy" htmlFor={`resume-${jobId}`}>
            Resume {hasResume ? "(upload new to replace primary)" : "(required)"}
          </label>
          <p className="mt-0.5 text-xs text-mk-muted">PDF or Word, up to 5 MB.</p>
          <input
            id={`resume-${jobId}`}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required={!hasResume}
            className="mt-2 block w-full text-sm text-mk-slate file:mr-3 file:rounded-lg file:border-0 file:bg-mk-sand file:px-3 file:py-2 file:text-sm file:font-medium file:text-mk-navy"
          />
        </div>
      ) : !hasResume ? (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Tip:{" "}
          <Link href="/candidate/profile" className="font-semibold underline">
            Upload your resume
          </Link>{" "}
          before applying so recruiters can review your full background.
        </p>
      ) : null}

      <div>
        <label className="text-sm font-semibold text-mk-navy" htmlFor="coverNote">
          Why you&apos;re a fit <span className="font-normal text-mk-muted">(optional)</span>
        </label>
        <p className="mt-0.5 text-xs text-mk-muted">
          Mention relevant experience, notice period, or location preference.
        </p>
        <textarea
          id="coverNote"
          name="coverNote"
          rows={5}
          maxLength={2000}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. I have 6 years in pharma HR including plant operations and employee relations. Available after 30 days notice, based in Ahmedabad."
          className={inputClass}
        />
        <p className="mt-1 text-right text-xs text-mk-muted">{note.length}/2000</p>
      </div>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
        {pending ? "Submitting application…" : "Submit application"}
      </Button>
    </form>
  );
}

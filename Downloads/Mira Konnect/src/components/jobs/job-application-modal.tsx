"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CloudUpload, Sparkles, Upload, X } from "lucide-react";
import { applyToJobAction, type ActionResult } from "@/actions/applications";
import type { ApplyFormPrefill } from "@/components/jobs/job-detail-apply-block";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-mk-navy/15 bg-white px-3 py-2.5 text-sm text-mk-navy placeholder:text-mk-muted focus:border-[#1e4d7b] focus:outline-none focus:ring-1 focus:ring-[#1e4d7b]/30";

type JobApplicationModalProps = {
  open: boolean;
  onClose: () => void;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  isLoggedInCandidate: boolean;
  hasResume: boolean;
  hasApplied: boolean;
  prefill: ApplyFormPrefill;
};

export function JobApplicationModal({
  open,
  onClose,
  jobId,
  jobSlug,
  jobTitle,
  isLoggedInCandidate,
  hasResume,
  hasApplied,
  prefill,
}: JobApplicationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => applyToJobAction(formData),
    null,
  );
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const loginNext = `/jobs/${jobSlug}?apply=1`;

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] m-0 h-full max-h-full w-full max-w-full border-0 bg-black/45 p-4 backdrop:bg-black/45 open:flex open:items-start open:justify-center open:overflow-y-auto sm:p-8"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div
        className="relative my-4 w-full max-w-3xl rounded-lg bg-white shadow-2xl sm:my-8"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-mk-muted hover:bg-mk-sand/60 hover:text-mk-navy"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-mk-navy/10 px-6 py-5 pr-14">
          <h2 className="font-display text-xl font-semibold text-mk-navy">Apply for the job</h2>
          <p className="mt-1 text-sm text-mk-muted">{jobTitle}</p>
        </div>

        <div className="px-6 py-6">
          {hasApplied ? (
            <p className="text-sm text-mk-slate">
              You have already applied for this role. Track progress in your{" "}
              <Link href="/candidate/applications" className="font-semibold text-mk-teal underline">
                applications dashboard
              </Link>
              .
            </p>
          ) : state?.ok ? (
            <div className="flex gap-3 rounded-lg border border-mk-teal/30 bg-mk-teal/5 p-5">
              <Sparkles className="h-6 w-6 shrink-0 text-mk-teal" aria-hidden />
              <div>
                <p className="font-display text-lg font-semibold text-mk-navy">Application sent</p>
                <p className="mt-1 text-sm text-mk-slate">
                  Thank you for applying. We will review your profile and be in touch.
                </p>
              </div>
            </div>
          ) : (
            <>
              {!isLoggedInCandidate ? (
                <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                  Sign in or create a candidate account to submit this application. You can fill in
                  the form now, then continue when prompted.
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/login?next=${encodeURIComponent(loginNext)}`}
                      className="rounded-md bg-[#1e4d7b] px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md border border-[#1e4d7b] px-3 py-1.5 text-xs font-semibold text-[#1e4d7b]"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              ) : null}

              <form action={action} className="space-y-5" encType="multipart/form-data">
                <input type="hidden" name="jobId" value={jobId} />
                <input type="hidden" name="applicationForm" value="full" />

                {state && !state.ok ? (
                  <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                    {state.error}
                  </p>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="firstName">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      className={fieldClass}
                      placeholder="First Name"
                      defaultValue={prefill.firstName}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="lastName">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      required
                      className={fieldClass}
                      placeholder="Last Name"
                      defaultValue={prefill.lastName}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={fieldClass}
                      placeholder="Email Address"
                      defaultValue={prefill.email}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="phone">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={fieldClass}
                      placeholder="Phone Number"
                      defaultValue={prefill.phone}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="currentJobTitle">
                      Current Job Title <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="currentJobTitle"
                      name="currentJobTitle"
                      required
                      className={fieldClass}
                      placeholder="Current Job Title"
                      defaultValue={prefill.currentJobTitle}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-mk-slate" htmlFor="currentSalary">
                      Current Salary
                    </label>
                    <input
                      id="currentSalary"
                      name="currentSalary"
                      className={fieldClass}
                      placeholder="Current Salary"
                      defaultValue={prefill.currentSalary}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-mk-slate" htmlFor="address">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    required
                    className={fieldClass}
                    placeholder="City, state"
                    defaultValue={prefill.address}
                  />
                </div>

                <div>
                  <label className="text-sm text-mk-slate" htmlFor="message">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={fieldClass}
                    placeholder="Type your Message"
                  />
                </div>

                <div>
                  <p className="text-sm text-mk-slate">
                    Resume <span className="text-red-600">*</span>
                  </p>
                  <div
                    className="mt-2 flex flex-col items-center rounded-md border border-dashed border-mk-navy/25 bg-mk-sand/20 px-4 py-8 text-center"
                  >
                    <CloudUpload className="h-10 w-10 text-mk-muted" aria-hidden />
                    <p className="mt-2 text-sm text-mk-slate">
                      Drop a resume file or click to upload.
                    </p>
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 rounded-md border-2 border-[#1e4d7b] px-4 py-2 text-sm font-semibold text-[#1e4d7b] hover:bg-[#1e4d7b]/5"
                    >
                      <Upload className="h-4 w-4" aria-hidden />
                      Upload Resume
                    </button>
                    {resumeName ? (
                      <p className="mt-2 text-xs font-medium text-mk-navy">{resumeName}</p>
                    ) : hasResume && isLoggedInCandidate ? (
                      <p className="mt-2 text-xs text-mk-muted">
                        You have a resume on file. Upload here to replace it for this application.
                      </p>
                    ) : null}
                    <input
                      ref={resumeInputRef}
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                      required={isLoggedInCandidate && !hasResume}
                      onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? null)}
                    />
                  </div>
                  <p className="mt-2 text-xs text-mk-muted">
                    Max 5 MB. Allowed: .jpeg, .doc, .docx, .pdf
                  </p>
                </div>

                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#1e4d7b]/40 px-4 py-2 text-sm font-semibold text-[#1e4d7b]">
                    <Upload className="h-4 w-4" aria-hidden />
                    Upload Cover Letter
                    <input
                      type="file"
                      name="coverLetter"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                    />
                  </label>
                  <p className="mt-2 text-xs text-mk-muted">
                    Max 1 MB. Allowed: .doc, .docx, .pdf
                  </p>
                </div>

                <div className="space-y-3 text-sm text-mk-slate">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="mt-1"
                    />
                    <span>
                      By clicking the checkbox, you agree to our{" "}
                      <Link href="/terms-and-conditions" className="text-[#1e4d7b] underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-[#1e4d7b] underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeEmail"
                      checked={agreeEmail}
                      onChange={(e) => setAgreeEmail(e.target.checked)}
                      className="mt-1"
                    />
                    <span>You accept email communication.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={pending || !isLoggedInCandidate || !agreeTerms}
                  className="w-full rounded-md bg-[#00bcd4] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#00a5bb] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pending ? "Submitting…" : "Apply For The Job"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

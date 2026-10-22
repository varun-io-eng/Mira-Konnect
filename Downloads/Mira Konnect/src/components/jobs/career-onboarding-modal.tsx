"use client";

import { useActionState, useEffect, useRef } from "react";
import { X, Upload } from "lucide-react";
import {
  submitCareerOnboardingAction,
  type ActionResult,
} from "@/actions/candidate-career-onboarding";
import { guessJobFunctionFromQuery } from "@/lib/candidate/guess-job-function";
import {
  JOB_FUNCTION_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
} from "@/lib/validations/career-onboarding";
import {
  portalFormInputClass,
  portalFormLabelClass,
  portalFormSubmitClass,
  portalFormUploadClass,
} from "@/lib/portal-form-styles";
import { cn } from "@/lib/utils";

const inputClass = portalFormInputClass;
const labelClass = portalFormLabelClass;
const req = <span className="text-red-600">*</span>;

type CareerOnboardingModalProps = {
  open: boolean;
  defaultName?: string;
  defaultPhone?: string;
  defaultEmail?: string;
  defaultCurrentLocation?: string;
  defaultPreferredLocation?: string;
  defaultJobFunctionQuery?: string;
  onComplete: () => void;
};

export function CareerOnboardingModal({
  open,
  defaultName = "",
  defaultPhone = "",
  defaultCurrentLocation = "",
  defaultPreferredLocation = "",
  defaultJobFunctionQuery = "",
  onComplete,
}: CareerOnboardingModalProps) {
  const guessedJobFunction = guessJobFunctionFromQuery(defaultJobFunctionQuery);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) =>
      submitCareerOnboardingAction(formData),
    null as ActionResult | null,
  );

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (state?.ok === true) onComplete();
  }, [state, onComplete]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[120] m-0 h-full max-h-full w-full max-w-full border-0 bg-black/50 p-4 backdrop:bg-black/50 open:flex open:items-start open:justify-center open:overflow-y-auto sm:p-8"
      onClose={(e) => e.preventDefault()}
    >
      <div className="relative my-4 w-full max-w-4xl rounded-xl bg-white shadow-2xl sm:my-8">
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full p-2 text-mk-muted hover:bg-mk-sand/80 hover:text-mk-navy"
          aria-label="Close"
          onClick={onComplete}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-mk-navy/10 px-6 py-5 pr-14 sm:px-8">
          <h2 className="font-display text-xl font-semibold text-mk-navy sm:text-2xl">
            Tell us about your career to get better-matched jobs
          </h2>
        </div>

        <form action={action} className="px-6 py-6 sm:px-8">
          {state?.ok === false ? (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {state.error}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="fullName">
                Full name {req}
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                defaultValue={defaultName}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone number {req}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                defaultValue={defaultPhone}
                className={inputClass}
                placeholder="Ex: 9876543210"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="resume">
                Upload your resume {req}
              </label>
              <p className="text-xs text-mk-muted">DOC, DOCX or PDF · Max 2 MB</p>
              <label className={cn(portalFormUploadClass)}>
                <Upload className="h-4 w-4" aria-hidden />
                Upload your resume
                <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className="sr-only" />
              </label>
            </div>

            <div>
              <label className={labelClass} htmlFor="linkedinUrl">LinkedIn URL</label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                className={inputClass}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <span className={labelClass}>Current years of work experience {req}</span>
              <div className="mt-1.5 flex gap-2">
                <input
                  name="experienceYears"
                  type="number"
                  min={0}
                  max={50}
                  required
                  defaultValue={0}
                  className={inputClass}
                  placeholder="Years"
                  aria-label="Years of experience"
                />
                <input
                  name="experienceMonths"
                  type="number"
                  min={0}
                  max={11}
                  required
                  defaultValue={0}
                  className={inputClass}
                  placeholder="Months"
                  aria-label="Months of experience"
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="noticePeriodDays">
                Notice period {req}
              </label>
              <select id="noticePeriodDays" name="noticePeriodDays" required className={inputClass} defaultValue="">
                <option value="" disabled>Select…</option>
                {NOTICE_PERIOD_OPTIONS.map((o) => (
                  <option key={o.days} value={o.days}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="jobFunction">
                Current job function {req}
              </label>
              <select
                id="jobFunction"
                name="jobFunction"
                required
                className={inputClass}
                defaultValue={guessedJobFunction ?? ""}
              >
                <option value="" disabled>Select current job function</option>
                {JOB_FUNCTION_OPTIONS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="currentSalaryLakhs">
                Current annual salary (₹ lacs per annum) {req}
              </label>
              <input
                id="currentSalaryLakhs"
                name="currentSalaryLakhs"
                type="number"
                step="0.1"
                min={0}
                required
                className={inputClass}
                placeholder="6.6"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="expectedSalaryLakhs">
                Expected annual salary (₹ lacs per annum) {req}
              </label>
              <input
                id="expectedSalaryLakhs"
                name="expectedSalaryLakhs"
                type="number"
                step="0.1"
                min={0}
                required
                className={inputClass}
                placeholder="15.5"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="currentLocation">
                Current location {req}
              </label>
              <input
                id="currentLocation"
                name="currentLocation"
                required
                defaultValue={defaultCurrentLocation}
                className={inputClass}
                placeholder="City, state"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="preferredLocation">
                Preferred location {req}
              </label>
              <input
                id="preferredLocation"
                name="preferredLocation"
                required
                defaultValue={defaultPreferredLocation}
                className={inputClass}
                placeholder="City, state"
              />
            </div>
          </div>

          <button type="submit" disabled={pending} className={portalFormSubmitClass}>
            {pending ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </dialog>
  );
}

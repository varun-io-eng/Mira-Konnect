"use client";

import { useActionState } from "react";
import { createJobAction, type ActionResult } from "@/actions/jobs-admin";
import {
  portalFormInputClass,
  portalFormLabelClass,
  portalFormSubmitClass,
} from "@/lib/portal-form-styles";
import { EmploymentType } from "@prisma/client";

const initial: ActionResult = { ok: true };

const req = <span className="text-red-600">*</span>;

type IndustryOption = { id: string; name: string };

const employmentOptions: { value: EmploymentType; label: string }[] = [
  { value: EmploymentType.FULL_TIME, label: "Full time" },
  { value: EmploymentType.PART_TIME, label: "Part time" },
  { value: EmploymentType.CONTRACT, label: "Contract" },
  { value: EmploymentType.INTERNSHIP, label: "Internship" },
  { value: EmploymentType.FREELANCE, label: "Freelance" },
];

export function AdminPublishJobForm({
  industries,
  onCancel,
}: {
  industries: IndustryOption[];
  inModal?: boolean;
  onCancel?: () => void;
}) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => createJobAction(formData),
    initial,
  );

  const labelClass = portalFormLabelClass;
  const fieldClass = portalFormInputClass;

  return (
    <form action={action}>
      {!state.ok ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">Job title {req}</label>
          <input id="title" name="title" required className={fieldClass} placeholder="e.g. HR Manager" />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">Location {req}</label>
          <input id="location" name="location" required className={fieldClass} placeholder="City, state" />
        </div>
        <div>
          <label className={labelClass} htmlFor="department">Department</label>
          <input id="department" name="department" className={fieldClass} placeholder="e.g. Human Resources" />
        </div>
        <div>
          <label className={labelClass} htmlFor="industryId">Industry / sector</label>
          <select id="industryId" name="industryId" className={fieldClass} defaultValue="">
            <option value="">Select sector…</option>
            {industries.map((ind) => (
              <option key={ind.id} value={ind.id}>{ind.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="employmentType">Employment type</label>
          <select
            id="employmentType"
            name="employmentType"
            className={fieldClass}
            defaultValue={EmploymentType.FULL_TIME}
          >
            {employmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="openings">Number of openings</label>
          <input id="openings" name="openings" type="number" min={1} defaultValue={1} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="experienceMin">Min experience (years)</label>
          <input id="experienceMin" name="experienceMin" type="number" min={0} className={fieldClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass} htmlFor="experienceMax">Max experience (years)</label>
          <input id="experienceMax" name="experienceMax" type="number" min={0} className={fieldClass} placeholder="10" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="salaryDisplay">Salary / package (display on listing)</label>
          <input
            id="salaryDisplay"
            name="salaryDisplay"
            className={fieldClass}
            placeholder="e.g. Competitive · Pharma MNC"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="salaryMin">Salary min (₹ per annum, optional)</label>
          <input id="salaryMin" name="salaryMin" type="number" min={0} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="salaryMax">Salary max (₹ per annum, optional)</label>
          <input id="salaryMax" name="salaryMax" type="number" min={0} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="applicationDeadline">Application deadline</label>
          <input id="applicationDeadline" name="applicationDeadline" type="date" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">Role summary {req}</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className={fieldClass}
            placeholder="Short overview candidates see in listings"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="responsibilities">Key responsibilities</label>
          <p className="text-xs text-mk-muted">One point per line</p>
          <textarea id="responsibilities" name="responsibilities" rows={4} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="requirements">Requirements</label>
          <p className="text-xs text-mk-muted">One point per line</p>
          <textarea id="requirements" name="requirements" rows={4} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="benefits">Benefits</label>
          <textarea id="benefits" name="benefits" rows={3} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="skills">Skills (comma-separated)</label>
          <input
            id="skills"
            name="skills"
            className={fieldClass}
            placeholder="e.g. HR Operations, Compliance, Excel"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-mk-slate">
            <input
              type="checkbox"
              name="publish"
              className="mt-1 h-4 w-4 rounded border-mk-navy/20 text-mk-teal"
              defaultChecked
            />
            <span>
              <span className="font-medium text-mk-navy">Publish immediately</span>
              <span className="text-mk-muted"> — live on the careers page. Uncheck to save as draft.</span>
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={portalFormSubmitClass}>
          {pending ? "Submitting…" : "Submit"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-mk-muted hover:text-mk-navy"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

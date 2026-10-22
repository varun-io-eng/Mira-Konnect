import type { ApplicationStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const styles: Partial<Record<ApplicationStatus, string>> = {
  APPLIED: "bg-sky-50 text-sky-800 ring-sky-200",
  SCREENING: "bg-violet-50 text-violet-800 ring-violet-200",
  SHORTLISTED: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  INTERVIEW_SCHEDULED: "bg-amber-50 text-amber-900 ring-amber-200",
  INTERVIEWED: "bg-orange-50 text-orange-900 ring-orange-200",
  SELECTED: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  OFFERED: "bg-teal-50 text-teal-900 ring-teal-200",
  JOINED: "bg-mk-teal/15 text-mk-teal-dark ring-mk-teal/30",
  REJECTED: "bg-red-50 text-red-800 ring-red-200",
  WITHDRAWN: "bg-mk-sand text-mk-muted ring-mk-navy/10",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        styles[status] ?? "bg-mk-sand text-mk-navy ring-mk-navy/10",
      )}
    >
      {label}
    </span>
  );
}

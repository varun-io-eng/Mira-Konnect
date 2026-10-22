"use client";

import { ApplicationStatus } from "@prisma/client";
import { updateApplicationStatusAction } from "@/actions/applications";

const statuses = Object.values(ApplicationStatus);

export function ApplicationStatusSelect({
  applicationId,
  current,
}: {
  applicationId: string;
  current: ApplicationStatus;
}) {
  return (
    <select
      className="mt-3 rounded-lg border border-mk-navy/15 px-2 py-1 text-sm"
      value={current}
      onChange={(e) =>
        updateApplicationStatusAction(applicationId, e.target.value as ApplicationStatus)
      }
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
      ))}
    </select>
  );
}

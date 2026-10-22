"use client";

import { useActionState } from "react";
import { scheduleInterviewAction, type ActionResult } from "@/actions/interviews";
import { InterviewType } from "@prisma/client";
import { Button } from "@/components/ui/button";

const initial: ActionResult = { ok: true };

const inputClass =
  "mt-1 w-full rounded-lg border border-mk-navy/15 px-2 py-1.5 text-sm";

export function ScheduleInterviewForm({ applicationId }: { applicationId: string }) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => scheduleInterviewAction(formData),
    initial,
  );

  return (
    <form action={action} className="mt-4 space-y-2 border-t border-mk-navy/10 pt-4">
      <input type="hidden" name="applicationId" value={applicationId} />
      {!state.ok ? <p className="text-sm text-red-700">{state.error}</p> : null}
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-mk-muted">Date & time</label>
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-mk-muted">Type</label>
          <select name="interviewType" className={inputClass} defaultValue={InterviewType.ONLINE}>
            <option value={InterviewType.ONLINE}>Online</option>
            <option value={InterviewType.PHONE}>Phone</option>
            <option value={InterviewType.IN_PERSON}>In person</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-mk-muted">Meeting link (optional)</label>
        <input type="url" name="meetingLink" className={inputClass} placeholder="https://…" />
      </div>
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Scheduling…" : "Schedule interview"}
      </Button>
    </form>
  );
}

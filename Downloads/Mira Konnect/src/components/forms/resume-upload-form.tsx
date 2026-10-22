"use client";

import { useActionState } from "react";
import {
  deleteResumeFormAction,
  uploadResumeAction,
  type ActionResult,
} from "@/actions/resume";
import { Button } from "@/components/ui/button";

const initial: ActionResult = { ok: true };

export function ResumeUploadForm({
  resumes,
}: {
  resumes: { id: string; fileName: string; uploadedAt: Date; isPrimary: boolean }[];
}) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => uploadResumeAction(formData),
    initial,
  );

  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-mk-navy">Resume</h2>
      <p className="mt-1 text-sm text-mk-muted">PDF or Word, up to 5 MB. Attached to applications you submit.</p>
      {!state.ok ? (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{state.error}</p>
      ) : null}
      <form action={action} className="mt-4 flex flex-wrap items-end gap-3">
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required
          className="text-sm"
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Uploading…" : "Upload resume"}
        </Button>
      </form>
      {resumes.length > 0 ? (
        <ul className="mt-6 space-y-2">
          {resumes.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
              <span>
                <a href={`/api/resumes/${r.id}`} className="font-medium text-mk-teal hover:underline">
                  {r.fileName}
                </a>
                {r.isPrimary ? (
                  <span className="ml-2 text-xs text-mk-muted">(primary)</span>
                ) : null}
              </span>
              <form action={deleteResumeFormAction}>
                <input type="hidden" name="resumeId" value={r.id} />
                <button type="submit" className="text-xs text-red-700 hover:underline">
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toggleSavedJobAction } from "@/actions/saved-jobs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SaveJobButton({
  jobId,
  jobSlug,
  initialSaved,
  isCandidate,
  className,
}: {
  jobId: string;
  jobSlug: string;
  initialSaved: boolean;
  isCandidate: boolean;
  className?: string;
}) {
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(initialSaved);

  if (!isCandidate) {
    return (
      <Link
        href={`/login?next=/jobs/${jobSlug}`}
        className={cn("text-sm font-medium text-mk-teal hover:underline", className)}
      >
        Sign in to save this job
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      disabled={pending}
      onClick={() => {
        start(async () => {
          const result = await toggleSavedJobAction(jobId);
          if (result.ok) setSaved(result.saved);
        });
      }}
    >
      {pending ? "Saving…" : saved ? "Saved" : "Save job"}
    </Button>
  );
}

"use server";

import { JobStatus, RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";

export type ActionResult = { ok: true; saved: boolean } | { ok: false; error: string };

export async function toggleSavedJobAction(jobId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Sign in as a job seeker to save jobs" };
  }

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.status !== JobStatus.PUBLISHED) {
    return { ok: false, error: "Job not found" };
  }

  const existing = await prisma.savedJob.findUnique({
    where: {
      candidateId_jobId: { candidateId: user.candidate.id, jobId },
    },
  });

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    revalidatePath("/candidate/saved-jobs");
    revalidatePath(`/jobs/${job.slug}`);
    return { ok: true, saved: false };
  }

  await prisma.savedJob.create({
    data: { candidateId: user.candidate.id, jobId },
  });
  revalidatePath("/candidate/saved-jobs");
  revalidatePath(`/jobs/${job.slug}`);
  return { ok: true, saved: true };
}

"use server";

import { RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { saveCandidateResumeFile } from "@/lib/resume/save-candidate-resume";
import { deleteResumeFile } from "@/lib/storage/local-resume";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function uploadResumeAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Unauthorized" };
  }

  const file = formData.get("resume");
  if (!(file instanceof File)) {
    return { ok: false, error: "Choose a PDF or Word document" };
  }
  const saved = await saveCandidateResumeFile(user.candidate.id, file);
  if (!saved.ok) return saved;

  revalidatePath("/candidate/profile");
  return { ok: true };
}

export async function deleteResumeFormAction(formData: FormData): Promise<void> {
  const resumeId = formData.get("resumeId");
  if (typeof resumeId === "string" && resumeId) {
    await deleteResumeAction(resumeId);
  }
}

export async function deleteResumeAction(resumeId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Unauthorized" };
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, candidateId: user.candidate.id },
  });
  if (!resume) return { ok: false, error: "Resume not found" };

  await prisma.resume.delete({ where: { id: resume.id } });
  await deleteResumeFile(resume.storageKey);
  revalidatePath("/candidate/profile");
  return { ok: true };
}

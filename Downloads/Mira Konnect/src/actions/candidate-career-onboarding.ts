"use server";

import { RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { careerOnboardingSchema } from "@/lib/validations/career-onboarding";
import { saveCandidateResumeFile } from "@/lib/resume/save-candidate-resume";
import { prisma } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

const RESUME_MAX = 2 * 1024 * 1024;

export async function submitCareerOnboardingAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Please sign in with a job seeker account." };
  }

  const parsed = careerOnboardingSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    linkedinUrl: formData.get("linkedinUrl") || "",
    experienceYears: formData.get("experienceYears"),
    experienceMonths: formData.get("experienceMonths"),
    noticePeriodDays: formData.get("noticePeriodDays"),
    jobFunction: formData.get("jobFunction"),
    currentSalaryLakhs: formData.get("currentSalaryLakhs"),
    expectedSalaryLakhs: formData.get("expectedSalaryLakhs"),
    currentLocation: formData.get("currentLocation"),
    preferredLocation: formData.get("preferredLocation"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return { ok: false, error: "Please upload your resume (PDF or Word, max 2 MB)." };
  }
  if (resume.size > RESUME_MAX) {
    return { ok: false, error: "Resume must be 2 MB or smaller." };
  }

  const saved = await saveCandidateResumeFile(user.candidate.id, resume);
  if (!saved.ok) return saved;

  const data = parsed.data;
  const expectedAnnual = Math.round(data.expectedSalaryLakhs * 100_000);
  const summary = [
    `linkedin: ${data.linkedinUrl?.trim() || "—"}`,
    `currentLocation: ${data.currentLocation}`,
    `preferredLocation: ${data.preferredLocation}`,
    `experience: ${data.experienceYears}y ${data.experienceMonths}m`,
    `currentSalaryLakhs: ${data.currentSalaryLakhs}`,
    `expectedSalaryLakhs: ${data.expectedSalaryLakhs}`,
  ].join("\n");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.fullName.trim(),
      phone: data.phone.trim(),
    },
  });

  await prisma.candidate.update({
    where: { id: user.candidate.id },
    data: {
      headline: data.jobFunction,
      expectedSalary: expectedAnnual,
      noticePeriodDays: data.noticePeriodDays,
      summary,
    },
  });

  await prisma.candidatePreferredLocation.deleteMany({
    where: { candidateId: user.candidate.id },
  });
  await prisma.candidatePreferredLocation.create({
    data: {
      candidateId: user.candidate.id,
      city: data.preferredLocation,
      country: "India",
    },
  });

  revalidatePath("/jobs");
  revalidatePath("/candidate/profile");
  return { ok: true };
}

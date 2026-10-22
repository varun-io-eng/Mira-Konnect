"use server";

import { RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function updateCandidateProfileAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Unauthorized" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: String(formData.get("name") ?? user.name).trim(),
      phone: String(formData.get("phone") ?? "") || null,
    },
  });

  await prisma.candidate.update({
    where: { id: user.candidate.id },
    data: {
      headline: String(formData.get("headline") ?? "") || null,
      summary: String(formData.get("summary") ?? "") || null,
      noticePeriodDays: formData.get("noticePeriodDays")
        ? Number(formData.get("noticePeriodDays"))
        : null,
    },
  });

  revalidatePath("/candidate/profile");
  return { ok: true };
}

/** Form action binding (void return for native form action) */
export async function submitCandidateProfileForm(formData: FormData): Promise<void> {
  await updateCandidateProfileAction(formData);
}

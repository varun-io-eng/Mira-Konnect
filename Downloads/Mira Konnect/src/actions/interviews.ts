"use server";

import { ApplicationStatus, InterviewType, RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { isAdminRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email/send";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function scheduleInterviewAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || !isAdminRole(user.role.name)) {
    return { ok: false, error: "Forbidden" };
  }

  const applicationId = String(formData.get("applicationId") ?? "");
  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "");
  const interviewType = formData.get("interviewType") as InterviewType;
  const meetingLink = String(formData.get("meetingLink") ?? "") || null;

  if (!applicationId || !scheduledAtRaw) {
    return { ok: false, error: "Application and date/time are required" };
  }
  if (!Object.values(InterviewType).includes(interviewType)) {
    return { ok: false, error: "Invalid interview type" };
  }

  const scheduledAt = new Date(scheduledAtRaw);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { ok: false, error: "Invalid date/time" };
  }

  const app = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { candidate: { include: { user: true } }, job: true },
  });
  if (!app) return { ok: false, error: "Application not found" };

  await prisma.interview.create({
    data: {
      applicationId: app.id,
      scheduledAt,
      interviewType,
      meetingLink,
    },
  });

  if (app.status === ApplicationStatus.APPLIED || app.status === ApplicationStatus.SCREENING) {
    await prisma.application.update({
      where: { id: app.id },
      data: {
        status: ApplicationStatus.INTERVIEW_SCHEDULED,
        statusHistory: {
          create: {
            fromStatus: app.status,
            toStatus: ApplicationStatus.INTERVIEW_SCHEDULED,
            changedByUserId: user.id,
            note: "Interview scheduled",
          },
        },
      },
    });
  }

  await sendTransactionalEmail({
    to: app.candidate.user.email,
    subject: `Interview scheduled — ${app.job.title}`,
    text: `Your interview for ${app.job.title} is scheduled for ${scheduledAt.toLocaleString("en-IN")}.`,
  });

  revalidatePath("/admin/applications");
  revalidatePath("/admin/interviews");
  revalidatePath("/candidate/applications");
  return { ok: true };
}

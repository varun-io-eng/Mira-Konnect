"use server";

import { ApplicationStatus, JobStatus, RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/get-user";
import { getNotificationInbox } from "@/lib/email/inbox";
import { sendTransactionalEmail } from "@/lib/email/send";
import { siteConfig } from "@/lib/site-config";
import { prisma } from "@/lib/db";
import { saveCandidateResumeFile } from "@/lib/resume/save-candidate-resume";
import { buildApplicationNotes, parseApplyFormData } from "@/lib/validations/application";
import { readResumeFile } from "@/lib/storage/local-resume";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function applyToJobAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.candidate || user.role.name !== RoleName.CANDIDATE) {
    return { ok: false, error: "Please sign in with a candidate account to submit your application." };
  }

  const coverLetter = formData.get("coverLetter");
  const coverLetterName =
    coverLetter instanceof File && coverLetter.size > 0 ? coverLetter.name : undefined;
  if (coverLetter instanceof File && coverLetter.size > 1024 * 1024) {
    return { ok: false, error: "Cover letter must be 1 MB or smaller." };
  }

  const { kind, parsed } = parseApplyFormData(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const job = await prisma.job.findUnique({ where: { id: parsed.data.jobId } });
  if (!job || job.status !== JobStatus.PUBLISHED) {
    return { ok: false, error: "This job is no longer accepting applications" };
  }

  const existing = await prisma.application.findUnique({
    where: {
      candidateId_jobId: {
        candidateId: user.candidate.id,
        jobId: job.id,
      },
    },
  });
  if (existing) return { ok: false, error: "You have already applied for this role" };

  const resumeFile = formData.get("resume");
  if (resumeFile instanceof File && resumeFile.size > 0) {
    const uploaded = await saveCandidateResumeFile(user.candidate.id, resumeFile);
    if (!uploaded.ok) return uploaded;
  } else {
    const resumeCount = await prisma.resume.count({
      where: { candidateId: user.candidate.id },
    });
    if (resumeCount === 0) {
      return { ok: false, error: "Please upload your resume (PDF or Word) to apply." };
    }
  }

  const notes =
    kind === "full"
      ? buildApplicationNotes({
          coverNote: parsed.data.coverNote,
          currentJobTitle: parsed.data.currentJobTitle,
          currentSalary: parsed.data.currentSalary,
          address: parsed.data.address,
          message: parsed.data.message,
          coverLetterName,
        })
      : parsed.data.coverNote;

  const phone = kind === "full" ? parsed.data.phone.trim() : undefined;
  const firstName = kind === "full" ? parsed.data.firstName.trim() : undefined;
  const lastName = kind === "full" ? parsed.data.lastName.trim() : undefined;
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || undefined;

  if (phone || fullName) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(phone ? { phone } : {}),
        ...(fullName ? { name: fullName } : {}),
      },
    });
  }

  const application = await prisma.application.create({
    data: {
      candidateId: user.candidate.id,
      jobId: job.id,
      employerId: job.employerId,
      notes,
      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: ApplicationStatus.APPLIED,
          changedByUserId: user.id,
          note: "Application submitted",
        },
      },
    },
  });

  const inbox = getNotificationInbox();
  const candidateLabel = fullName ?? user.name ?? user.email;
  const formEmail = kind === "full" ? parsed.data.email : user.email;
  const adminUrl = `${siteConfig.url}/admin/applications`;

  const teamText = [
    "New job application on Mira Konnect",
    "",
    `Job: ${job.title}`,
    `Job URL: ${siteConfig.url}/jobs/${job.slug}`,
    `Application ID: ${application.id}`,
    "",
    `Candidate: ${candidateLabel}`,
    `Email: ${formEmail}`,
    phone ? `Phone: ${phone}` : null,
    kind === "full" && parsed.data.currentJobTitle
      ? `Current role: ${parsed.data.currentJobTitle}`
      : null,
    notes ? `\nApplication details:\n${notes}` : null,
    coverLetterName ? `Cover letter uploaded: ${coverLetterName}` : null,
    "",
    `Review in admin: ${adminUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Get candidate's resume for attachment
  const resume = await prisma.resume.findFirst({
    where: { candidateId: user.candidate.id, isPrimary: true },
  });

  const attachments = [];
  if (resume) {
    try {
      const resumeBuffer = await readResumeFile(resume.storageKey);
      attachments.push({
        filename: resume.fileName,
        content: resumeBuffer,
        contentType: resume.mimeType,
      });
    } catch (err) {
      console.error("[application] Failed to attach resume:", err);
    }
  }

  await sendTransactionalEmail({
    to: inbox,
    replyTo: formEmail,
    subject: `Job application: ${job.title} (${candidateLabel})`,
    text: teamText,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job application: ${job.title}</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background-color:#f4f4f4;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e4d7b 0%,#00bcd4 100%);padding:32px;">
      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;">New Job Application</h1>
      <p style="margin:8px 0 0 0;color:#ffffff;font-size:16px;opacity:0.9;">${job.title}</p>
    </div>

    <!-- Content -->
    <div style="padding:32px;">
      <p style="margin:0 0 24px 0;color:#1a2b3c;font-size:15px;">
        A new candidate has applied for the position below.
      </p>

      <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:24px 0;">
        <h3 style="margin:0 0 16px 0;font-size:14px;color:#1a2b3c;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Job Information</h3>
        <p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Job Title:</strong> ${job.title}</p>
        <p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Job URL:</strong> <a href="${siteConfig.url}/jobs/${job.slug}" style="color:#00bcd4;text-decoration:none;">${siteConfig.url}/jobs/${job.slug}</a></p>
        <p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Application ID:</strong> ${application.id}</p>
      </div>

      <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:24px 0;">
        <h3 style="margin:0 0 16px 0;font-size:14px;color:#1a2b3c;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Candidate Information</h3>
        <p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Name:</strong> ${candidateLabel}</p>
        <p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Email:</strong> <a href="mailto:${formEmail}" style="color:#00bcd4;text-decoration:none;">${formEmail}</a></p>
        ${phone ? `<p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Phone:</strong> ${phone}</p>` : ''}
        ${kind === "full" && parsed.data.currentJobTitle ? `<p style="margin:8px 0;color:#1a2b3c;"><strong style="color:#00bcd4;">Current Role:</strong> ${parsed.data.currentJobTitle}</p>` : ''}
      </div>

      ${notes ? `
      <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:24px 0;">
        <h3 style="margin:0 0 16px 0;font-size:14px;color:#1a2b3c;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Application Details</h3>
        <p style="margin:8px 0;color:#1a2b3c;white-space:pre-wrap;">${notes}</p>
      </div>
      ` : ''}

      ${coverLetterName ? `
      <div style="background:#fff3cd;padding:16px;border-radius:8px;margin:24px 0;border-left:4px solid #ffc107;">
        <p style="margin:0;color:#856404;font-size:14px;"><strong>Cover Letter:</strong> ${coverLetterName}</p>
      </div>
      ` : ''}

      ${resume ? `
      <div style="background:#d1ecf1;padding:16px;border-radius:8px;margin:24px 0;border-left:4px solid #00bcd4;">
        <p style="margin:0;color:#0c5460;font-size:14px;"><strong>Resume:</strong> ${resume.fileName} (attached)</p>
      </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e9ecef;">
        <p style="margin:0;color:#6c757d;font-size:13px;">
          <strong>Mira Konnect</strong><br>
          Professional Recruitment Services<br>
          <a href="https://mirakonnect.com" style="color:#00bcd4;text-decoration:none;">mirakonnect.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    autoGenerated: true,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  await sendTransactionalEmail({
    to: user.email,
    subject: `Application received — ${job.title}`,
    text: `Your application for ${job.title} at Mira Konnect has been submitted. Track status in your candidate portal.`,
  });

  revalidatePath("/candidate/applications");
  revalidatePath("/candidate/profile");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${job.slug}`);
  return { ok: true };
}

export async function updateApplicationStatusAction(
  applicationId: string,
  status: ApplicationStatus,
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Unauthorized" };
  const allowed =
    user.role.name === RoleName.ADMIN ||
    user.role.name === RoleName.SUPER_ADMIN ||
    user.role.name === RoleName.RECRUITER;
  if (!allowed) return { ok: false, error: "Forbidden" };

  const app = await prisma.application.findUnique({ where: { id: applicationId } });
  if (!app) return { ok: false, error: "Application not found" };

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status,
      statusHistory: {
        create: {
          fromStatus: app.status,
          toStatus: status,
          changedByUserId: user.id,
        },
      },
    },
  });

  const full = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { candidate: { include: { user: true } }, job: true },
  });
  if (full) {
    await sendTransactionalEmail({
      to: full.candidate.user.email,
      subject: `Application update — ${full.job.title}`,
      text: `Your application status for ${full.job.title} is now: ${status.replace(/_/g, " ")}.`,
    });
  }

  revalidatePath("/admin/applications");
  revalidatePath("/candidate/applications");
  return { ok: true };
}

"use server";

import { EmploymentType, JobStatus, RoleName } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

function assertAdmin(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) throw new Error("UNAUTHORIZED");
  const ok =
    user.role.name === RoleName.ADMIN ||
    user.role.name === RoleName.SUPER_ADMIN ||
    user.role.name === RoleName.RECRUITER;
  if (!ok) throw new Error("FORBIDDEN");
  return user;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseOptionalInt(value: FormDataEntryValue | null): number | null {
  const s = String(value ?? "").trim();
  if (!s) return null;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function parseSkills(raw: string): string[] {
  return raw
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 24);
}

export async function createJobAction(formData: FormData): Promise<ActionResult> {
  const user = assertAdmin(await getCurrentUser());
  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title || !location || !description) {
    return { ok: false, error: "Title, location, and description are required" };
  }

  let slug = slugify(title);
  const collision = await prisma.job.findUnique({ where: { slug } });
  if (collision) slug = `${slug}-${Date.now().toString(36)}`;

  const status =
    formData.get("publish") === "on" ? JobStatus.PUBLISHED : JobStatus.DRAFT;

  const employmentRaw = String(formData.get("employmentType") ?? EmploymentType.FULL_TIME);
  const employmentType = Object.values(EmploymentType).includes(employmentRaw as EmploymentType)
    ? (employmentRaw as EmploymentType)
    : EmploymentType.FULL_TIME;

  const industryId = String(formData.get("industryId") ?? "").trim() || null;
  const department = String(formData.get("department") ?? "").trim() || null;
  const responsibilities = String(formData.get("responsibilities") ?? "").trim() || null;
  const requirements = String(formData.get("requirements") ?? "").trim() || null;
  const benefits = String(formData.get("benefits") ?? "").trim() || null;
  const salaryDisplay = String(formData.get("salaryDisplay") ?? "").trim() || null;
  const skills = parseSkills(String(formData.get("skills") ?? ""));

  const experienceMin = parseOptionalInt(formData.get("experienceMin"));
  const experienceMax = parseOptionalInt(formData.get("experienceMax"));
  const salaryMin = parseOptionalInt(formData.get("salaryMin"));
  const salaryMax = parseOptionalInt(formData.get("salaryMax"));
  const openings = parseOptionalInt(formData.get("openings")) ?? 1;

  const deadlineRaw = String(formData.get("applicationDeadline") ?? "").trim();
  const applicationDeadline = deadlineRaw ? new Date(deadlineRaw) : null;

  const job = await prisma.job.create({
    data: {
      title,
      slug,
      location,
      description,
      responsibilities,
      requirements,
      benefits,
      department,
      employmentType,
      experienceMin,
      experienceMax,
      salaryMin,
      salaryMax,
      salaryDisplay,
      openings,
      applicationDeadline,
      industryId,
      status,
      publishedAt: status === JobStatus.PUBLISHED ? new Date() : null,
      postedByUserId: user.id,
      skills: skills.length
        ? { create: skills.map((name) => ({ name })) }
        : undefined,
    },
  });

  revalidatePath("/admin/jobs");
  revalidatePath("/admin/publish");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${job.slug}`);
  redirect(`/admin/publish?success=1&slug=${encodeURIComponent(job.slug)}`);
}

export async function setJobStatusAction(jobId: string, status: JobStatus): Promise<ActionResult> {
  assertAdmin(await getCurrentUser());
  await prisma.job.update({
    where: { id: jobId },
    data: {
      status,
      publishedAt: status === JobStatus.PUBLISHED ? new Date() : undefined,
    },
  });
  revalidatePath("/admin/jobs");
  revalidatePath("/admin/publish");
  revalidatePath("/jobs");
  return { ok: true };
}

export async function deleteJobAction(jobId: string): Promise<ActionResult> {
  assertAdmin(await getCurrentUser());
  const id = jobId.trim();
  if (!id) return { ok: false, error: "Invalid job" };
  try {
    await prisma.job.delete({ where: { id } });
  } catch {
    return { ok: false, error: "Could not delete this job. It may already be removed." };
  }
  revalidatePath("/admin/jobs");
  revalidatePath("/admin/publish");
  revalidatePath("/jobs");
  return { ok: true };
}

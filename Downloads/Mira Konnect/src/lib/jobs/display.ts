import type { EmploymentType, Job } from "@prisma/client";

export function formatEmploymentType(type: EmploymentType) {
  return type.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatExperience(job: Pick<Job, "experienceMin" | "experienceMax">) {
  if (job.experienceMin != null && job.experienceMax != null) {
    return `${job.experienceMin}–${job.experienceMax} years`;
  }
  if (job.experienceMin != null) {
    return `${job.experienceMin}+ years`;
  }
  if (job.experienceMax != null) {
    return `Up to ${job.experienceMax} years`;
  }
  return null;
}

/** Split JD text into bullet lines (newline or • prefixed). */
export function parseJobBullets(text: string | null | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[\s•\-–*]+/, "").trim())
    .filter(Boolean);
}

export function formatPostedDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatPostedRelative(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Published just now";
  if (hours < 24) {
    return `Published ${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 14) {
    return `Published ${days} day${days === 1 ? "" : "s"} ago`;
  }
  return `Published ${formatPostedDate(date)}`;
}

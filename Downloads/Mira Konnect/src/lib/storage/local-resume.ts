import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_ROOT = path.join(process.cwd(), "private", "uploads", "resumes");

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

export const RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function resumeAbsolutePath(storageKey: string) {
  const normalized = path.normalize(storageKey).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(UPLOAD_ROOT, normalized);
}

export async function saveResumeFile(
  candidateId: string,
  fileName: string,
  bytes: Buffer,
): Promise<string> {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  const storageKey = path.join(candidateId, `${randomUUID()}-${safeName}`);
  const fullPath = resumeAbsolutePath(storageKey);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, bytes);
  return storageKey.replace(/\\/g, "/");
}

export async function readResumeFile(storageKey: string) {
  return readFile(resumeAbsolutePath(storageKey));
}

export async function deleteResumeFile(storageKey: string) {
  try {
    await unlink(resumeAbsolutePath(storageKey));
  } catch {
    // file may already be gone
  }
}

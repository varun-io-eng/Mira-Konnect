import { prisma } from "@/lib/db";
import {
  RESUME_MAX_BYTES,
  RESUME_MIME_TYPES,
  saveResumeFile,
} from "@/lib/storage/local-resume";

export type ResumeSaveResult = { ok: true } | { ok: false; error: string };

export async function saveCandidateResumeFile(
  candidateId: string,
  file: File,
): Promise<ResumeSaveResult> {
  if (file.size === 0) {
    return { ok: false, error: "Choose a PDF or Word document" };
  }
  if (file.size > RESUME_MAX_BYTES) {
    return { ok: false, error: "File must be 5 MB or smaller" };
  }
  if (!RESUME_MIME_TYPES.has(file.type)) {
    return { ok: false, error: "Only PDF or Word (.doc, .docx) files are allowed" };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const storageKey = await saveResumeFile(candidateId, file.name, bytes);

  await prisma.resume.updateMany({
    where: { candidateId, isPrimary: true },
    data: { isPrimary: false },
  });

  await prisma.resume.create({
    data: {
      candidateId,
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      storageKey,
      isPrimary: true,
    },
  });

  return { ok: true };
}

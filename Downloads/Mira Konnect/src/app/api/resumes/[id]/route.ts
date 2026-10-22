import { RoleName } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-user";
import { isAdminRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { readResumeFile } from "@/lib/storage/local-resume";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resume = await prisma.resume.findUnique({
    where: { id },
    include: { candidate: { include: { user: true } } },
  });
  if (!resume) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner =
    user.role.name === RoleName.CANDIDATE && user.candidate?.id === resume.candidateId;
  const isStaff = isAdminRole(user.role.name);

  let employerOk = false;
  if (user.role.name === RoleName.EMPLOYER && user.employer) {
    const linked = await prisma.application.findFirst({
      where: {
        candidateId: resume.candidateId,
        employerId: user.employer.id,
      },
    });
    employerOk = !!linked;
  }

  if (!isOwner && !isStaff && !employerOk) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await readResumeFile(resume.storageKey);
    return new NextResponse(body, {
      headers: {
        "Content-Type": resume.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(resume.fileName)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "File missing on server" }, { status: 404 });
  }
}

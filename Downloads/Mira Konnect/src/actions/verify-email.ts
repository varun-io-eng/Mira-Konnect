"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { dashboardPathForRole } from "@/lib/auth/rbac";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function verifyEmailAction(token: string): Promise<ActionResult> {
  if (!token) {
    return { ok: false, error: "Invalid verification link" };
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
    include: { role: true },
  });

  if (!user) {
    return { ok: false, error: "Invalid or expired verification link" };
  }

  if (user.emailVerified) {
    return { ok: false, error: "Email already verified" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
    },
  });

  // Create session after verification
  await createSession({
    userId: user.id,
    role: user.role.name,
    email: user.email,
    name: user.name,
  });

  redirect(dashboardPathForRole(user.role.name));
}

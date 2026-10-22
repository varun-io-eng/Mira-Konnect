"use server";

import { UserStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { getPublisherEmail } from "@/lib/auth/publisher-credentials";
import { isAdminRole } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validations/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function publisherLoginAction(formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const email = parsed.data.email.toLowerCase();
  const allowedEmail = getPublisherEmail();
  if (email !== allowedEmail) {
    return {
      ok: false,
      error: "This portal is only for the designated publisher account.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user || user.status !== UserStatus.ACTIVE) {
    return { ok: false, error: "Invalid email or password" };
  }

  if (!isAdminRole(user.role.name)) {
    return { ok: false, error: "This account is not authorized to publish jobs." };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return { ok: false, error: "Invalid email or password" };

  await createSession({
    userId: user.id,
    role: user.role.name,
    email: user.email,
    name: user.name,
  });

  const next =
    typeof formData.get("next") === "string" && String(formData.get("next")).startsWith("/admin")
      ? String(formData.get("next"))
      : "/admin/publish";

  redirect(next);
}

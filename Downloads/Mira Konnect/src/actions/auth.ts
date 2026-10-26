"use server";

import { RoleName, UserStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/auth/redirect";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db";
import { isFindJobRedirect } from "@/lib/find-job";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

/**
 * Ensure system roles exist. Creates them if missing.
 * This is a fail-safe to handle cases where seeding didn't run during deployment.
 */
async function ensureRolesExist() {
  const existingRoles = await prisma.role.findMany();
  const existingRoleNames = new Set(existingRoles.map((r) => r.name));

  const rolesToCreate = Object.values(RoleName).filter(
    (name) => !existingRoleNames.has(name),
  );

  if (rolesToCreate.length > 0) {
    console.log(`Auto-seeding ${rolesToCreate.length} missing system roles...`);
    await Promise.all(
      rolesToCreate.map((name) =>
        prisma.role.create({
          data: { name, description: `${name} role` },
        }),
      ),
    );
    console.log("System roles auto-seeded successfully.");
  }
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    include: { role: true },
  });

  if (!user || user.status !== UserStatus.ACTIVE) {
    return { ok: false, error: "Invalid email or password" };
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return { ok: false, error: "Invalid email or password" };

  const nextStr = typeof formData.get("next") === "string" ? String(formData.get("next")) : null;
  if (isFindJobRedirect(nextStr) && user.role.name !== RoleName.CANDIDATE) {
    return {
      ok: false,
      error:
        "This path is for job seekers. Use the main sign-in page for employer or admin accounts.",
    };
  }

  await createSession({
    userId: user.id,
    role: user.role.name,
    email: user.email,
    name: user.name,
  });

  redirect(safeRedirectPath(nextStr, user.role.name));
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const nextStr = typeof formData.get("next") === "string" ? String(formData.get("next")) : null;
  const jobSeekerFlow = isFindJobRedirect(nextStr);

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    accountType: jobSeekerFlow ? "candidate" : formData.get("accountType") || "candidate",
    companyName: jobSeekerFlow ? undefined : formData.get("companyName") || undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (parsed.data.accountType === "employer" && !parsed.data.companyName?.trim()) {
    return { ok: false, error: "Company name is required for employers" };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, error: "An account with this email already exists" };

  // Ensure roles exist before registration
  await ensureRolesExist();

  const roleName =
    parsed.data.accountType === "employer" ? RoleName.EMPLOYER : RoleName.CANDIDATE;
  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) return { ok: false, error: "Failed to initialize system roles. Please try again." };

  const passwordHash = await hashPassword(parsed.data.password);

  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash,
      roleId: role.id,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
      ...(roleName === RoleName.CANDIDATE
        ? { candidate: { create: {} } }
        : {
            employer: {
              create: {
                company: {
                  create: {
                    name: parsed.data.companyName!.trim(),
                  },
                },
              },
            },
          }),
    },
    include: { role: true },
  });

  // Create session immediately after registration
  await createSession({
    userId: user.id,
    role: user.role.name,
    email: user.email,
    name: user.name,
  });

  redirect(safeRedirectPath(nextStr, user.role.name));
}

export async function logoutAction(formData?: FormData) {
  await destroySession();
  const redirectTo = formData?.get("redirectTo");
  redirect(redirectTo === "/" ? "/" : "/login");
}

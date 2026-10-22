import { RoleName } from "@prisma/client";
import type { SessionPayload } from "@/lib/auth/session";

export function isAdminRole(role: RoleName) {
  return role === RoleName.SUPER_ADMIN || role === RoleName.ADMIN || role === RoleName.RECRUITER;
}

export function dashboardPathForRole(role: RoleName) {
  switch (role) {
    case RoleName.CANDIDATE:
      return "/candidate";
    case RoleName.EMPLOYER:
      return "/employer";
    case RoleName.SUPER_ADMIN:
    case RoleName.ADMIN:
    case RoleName.RECRUITER:
      return "/admin/publish";
    default:
      return "/";
  }
}

export function requireSession(session: SessionPayload | null) {
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

export function requireRole(session: SessionPayload, allowed: RoleName[]) {
  if (!allowed.includes(session.role)) throw new Error("FORBIDDEN");
  return session;
}

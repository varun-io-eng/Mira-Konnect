import { dashboardPathForRole } from "@/lib/auth/rbac";
import type { RoleName } from "@prisma/client";

const ALLOWED_PREFIXES = ["/candidate", "/employer", "/admin", "/jobs"];

/** Only allow same-origin relative paths after login. */
export function safeRedirectPath(
  next: string | null | undefined,
  role: RoleName,
): string {
  const fallback = dashboardPathForRole(role);
  if (!next || typeof next !== "string") return fallback;
  const path = next.trim();
  if (!path.startsWith("/") || path.startsWith("//")) return fallback;
  const pathname = path.split("?")[0] ?? path;
  const ok = ALLOWED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return ok ? path : fallback;
}

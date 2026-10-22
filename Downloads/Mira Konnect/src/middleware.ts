import { RoleName } from "@prisma/client";
import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "mk_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function readSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      role: payload.role as RoleName,
      userId: payload.userId as string,
    };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  const session = await readSession(request);

  const isCandidate = pathname.startsWith("/candidate");
  const isEmployer = pathname.startsWith("/employer");
  const isAdmin = pathname.startsWith("/admin");

  if (!isCandidate && !isEmployer && !isAdmin) {
    return NextResponse.next();
  }

  if (!session) {
    const login = isAdmin
      ? new URL("/admin/login", request.url)
      : new URL("/login", request.url);
    if (!isAdmin) login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (isCandidate && session.role !== RoleName.CANDIDATE) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isEmployer && session.role !== RoleName.EMPLOYER) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    isAdmin &&
    session.role !== RoleName.ADMIN &&
    session.role !== RoleName.SUPER_ADMIN &&
    session.role !== RoleName.RECRUITER
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/candidate/:path*", "/employer/:path*", "/admin/:path*"],
};

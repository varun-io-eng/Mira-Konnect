import Link from "next/link";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";

type AccountAuthCardProps = {
  mode: "login" | "register";
  next?: string;
  children: React.ReactNode;
};

export function AccountAuthCard({ mode, next, children }: AccountAuthCardProps) {
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-xl shadow-mk-navy/10">
        <div className="bg-gradient-to-br from-mk-navy via-[#1e4d7b] to-mk-teal px-5 py-5 text-white sm:px-6">
          <div className="flex flex-col items-center text-center">
            <SettingSunLogo variant="light" className="justify-center" />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              Mira Konnect
            </p>
            <h1 className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/85 sm:text-[13px]">
              {mode === "login"
                ? "Sign in as a job seeker or employer."
                : "Register to apply for roles or manage hiring with Mira Konnect."}
            </p>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>

        {mode === "register" ? (
          <div className="border-t border-mk-navy/8 bg-mk-sand/30 px-5 py-3 text-center text-sm text-mk-slate sm:px-6">
            Already registered?{" "}
            <Link href={loginHref} className="font-semibold text-mk-teal hover:underline">
              Sign in
            </Link>
          </div>
        ) : null}
      </div>

      {mode === "login" ? (
        <p className="mt-4 text-center text-xs text-mk-muted">
          Publishing jobs?{" "}
          <Link href="/admin/login" className="font-medium text-mk-navy hover:underline">
            Publisher sign in
          </Link>
          {" "}
          — one authorized account, no registration.
        </p>
      ) : null}
    </div>
  );
}

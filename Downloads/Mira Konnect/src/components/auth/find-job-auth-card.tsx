import Link from "next/link";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { findJobPath } from "@/lib/find-job";

type FindJobAuthCardProps = {
  mode: "login" | "register";
  next: string;
  children: React.ReactNode;
};

export function FindJobAuthCard({ mode, next, children }: FindJobAuthCardProps) {
  const encodedNext = encodeURIComponent(next || findJobPath());
  const switchHref =
    mode === "login"
      ? `/register?next=${encodedNext}`
      : `/login?next=${encodedNext}`;

  return (
    <div className="mx-auto w-full max-w-md px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-xl shadow-mk-navy/10">
        <div className="bg-gradient-to-br from-mk-navy via-[#1e4d7b] to-mk-teal px-5 py-5 text-white sm:px-6">
          <div className="flex flex-col items-center text-center">
            <SettingSunLogo variant="light" className="justify-center" />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              Find a job
            </p>
            <h1 className="mt-1 font-display text-xl font-semibold leading-snug sm:text-2xl">
              {mode === "login" ? "Welcome back" : "Create your profile"}
            </h1>
            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/85 sm:text-[13px]">
              {mode === "login"
                ? "Sign in to complete your career details and explore openings."
                : "Register briefly, then share your experience so we can match you to roles."}
            </p>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>

        <div className="border-t border-mk-navy/8 bg-mk-sand/30 px-5 py-3 text-center text-sm text-mk-slate sm:px-6">
          {mode === "login" ? (
            <>
              New here?{" "}
              <Link href={switchHref} className="font-semibold text-mk-teal hover:underline">
                Create a job seeker account
              </Link>
            </>
          ) : (
            <>
              Already registered?{" "}
              <Link href={switchHref} className="font-semibold text-mk-teal hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-mk-muted">
        Hiring for your company?{" "}
        <Link href="/contact" className="font-medium text-mk-navy hover:underline">
          Contact us to hire talent
        </Link>
      </p>
    </div>
  );
}

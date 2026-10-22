import { logoutAction } from "@/actions/auth";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { CandidatePortalHero } from "@/components/candidate/candidate-portal-hero";
import { CandidatePortalNav } from "@/components/candidate/candidate-portal-nav";

type NavItem = { href: string; label: string };

export function CandidatePortalShell({
  nav,
  children,
}: {
  nav: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="relative">
        <CandidatePortalHero />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-[#071525]/75 via-[#071525]/25 to-transparent pb-16">
          <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-2 pt-4 sm:px-6 sm:pt-5">
            <SettingSunLogo showWordmark variant="light" className="shrink-0" />
            <form action={logoutAction} className="shrink-0">
              <button
                type="submit"
                className="rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-mk-navy/8 bg-white/96 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6">
          <CandidatePortalNav items={nav} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

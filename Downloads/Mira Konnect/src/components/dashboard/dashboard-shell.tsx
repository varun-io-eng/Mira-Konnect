import { logoutAction } from "@/actions/auth";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

type NavItem = { href: string; label: string };

export function DashboardShell({
  title,
  nav,
  children,
}: {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mk-sand/50 to-mk-sand/20">
      <header className="border-b border-mk-navy/10 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <SettingSunLogo showWordmark variant="dark" className="shrink-0" />
          <p className="hidden text-sm font-medium text-mk-navy sm:block">{title}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-mk-teal hover:text-mk-teal-dark"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr]">
        <DashboardNav items={nav} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

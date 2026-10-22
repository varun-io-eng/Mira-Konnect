"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  AboutNavDropdown,
  IndustriesNavDropdown,
} from "@/components/marketing/site-nav-dropdown";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { HeaderCtaButtons } from "@/components/marketing/header-cta-buttons";
import { pillNavLinks } from "@/lib/site-config";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  /** Sits on top of dark hero image */
  overlay?: boolean;
  /** Auth pages: nav only, no M mark top-left */
  showLogo?: boolean;
};

const simpleLinks = pillNavLinks.filter(
  (l) =>
    l.label !== "Home" &&
    l.label !== "About Us" &&
    l.label !== "Services" &&
    l.label !== "Industries" &&
    l.label !== "Jobs",
);

export function SiteHeader({ overlay = false, showLogo = true }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = overlay && !scrolled;

  return (
    <header
      className={cn(
        "relative z-[100] w-full transition-all duration-300",
        overlay ? "absolute left-0 top-0" : "sticky top-0 border-b border-mk-navy/5 bg-white/95 backdrop-blur-md",
        overlay && scrolled && "fixed bg-white/95 shadow-md backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1400px] items-start gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5",
          showLogo ? "justify-between" : "justify-end",
        )}
      >
        {showLogo ? (
          <SettingSunLogo
            layout="stacked"
            variant={onHero ? "light" : "dark"}
            className="shrink-0 lg:pt-0.5"
          />
        ) : null}

        <div className={cn("flex flex-col gap-3", showLogo ? "flex-1 items-end" : "items-end")}>
          <nav
            className={cn(
              "hidden items-center gap-0.5 rounded-full px-2 py-1.5 shadow-lg lg:flex",
              onHero
                ? "bg-white/95 text-mk-navy shadow-black/20"
                : "bg-white text-mk-navy shadow-mk-navy/10 ring-1 ring-mk-navy/5",
            )}
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className={cn(
                "rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-mk-sand/80",
                pathname === "/" && "bg-mk-sand text-mk-teal",
              )}
            >
              Home
            </Link>
            <AboutNavDropdown />
            <Link
              href="/services"
              className={cn(
                "rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-mk-sand/80",
                (pathname === "/services" || pathname.startsWith("/services/")) &&
                  "bg-mk-sand text-mk-teal",
              )}
            >
              Services
            </Link>
            <IndustriesNavDropdown />
            {simpleLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-mk-sand/80",
                    active && "bg-mk-sand text-mk-teal",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <HeaderCtaButtons className="ml-1 shrink-0" />
          </nav>

          <button
            type="button"
            className={cn(
              "rounded-full p-2.5 lg:hidden",
              onHero ? "bg-white/90 text-mk-navy" : "bg-mk-sand text-mk-navy",
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="max-h-[80vh] overflow-y-auto border-t border-mk-navy/10 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className="rounded-lg px-3 py-2.5 text-sm text-mk-slate hover:bg-mk-sand"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <p className="px-3 pt-3 text-[11px] font-bold uppercase tracking-wider text-mk-muted">
              About
            </p>
            {[
              { href: "/about", label: "About Mira Konnect" },
              { href: "/how-we-work", label: "How we work" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-mk-slate hover:bg-mk-sand"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-lg px-3 py-2.5 text-sm text-mk-slate hover:bg-mk-sand"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <p className="px-3 pt-3 text-[11px] font-bold uppercase tracking-wider text-mk-muted">
              Industries
            </p>
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries?sector=${ind.slug}`}
                className="rounded-lg px-3 py-2 text-sm text-mk-slate hover:bg-mk-sand"
                onClick={() => setMobileOpen(false)}
              >
                {ind.name}
              </Link>
            ))}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-mk-slate hover:bg-mk-sand"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-mk-navy/10 pt-4">
              <HeaderCtaButtons stacked onNavigate={() => setMobileOpen(false)} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function HeaderGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (pathname === "/jobs" || pathname.startsWith("/jobs/")) return null;
  if (pathname === "/login" || pathname === "/register") {
    return <SiteHeader showLogo={false} />;
  }
  return <SiteHeader overlay />;
}

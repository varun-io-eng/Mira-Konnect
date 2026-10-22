"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "border-mk-navy/10 shadow-md shadow-mk-navy/5"
          : "border-mk-navy/5 shadow-none",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="font-display text-xl font-semibold tracking-tight text-mk-navy">
            Mira Konnect
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-mk-muted">
            Recruitment & Staffing
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-mk-slate transition-colors hover:bg-mk-sand hover:text-mk-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/jobs" variant="outline" size="sm">
            Find Jobs
          </Button>
          <Button href="/for-employers" variant="secondary" size="sm">
            Hire Talent
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-mk-navy lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-mk-navy/5 bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-mk-slate hover:bg-mk-sand"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-mk-navy/5 pt-4">
            <Button href="/jobs" variant="outline" className="w-full">
              Find Jobs
            </Button>
            <Button href="/for-employers" variant="secondary" className="w-full">
              Hire Talent
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

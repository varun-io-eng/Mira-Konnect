"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Pencil, ClipboardList } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { cn } from "@/lib/utils";

type JobsCandidateHeaderProps = {
  name: string;
};

export function JobsCandidateHeader({ name }: JobsCandidateHeaderProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-[100] border-b border-mk-navy/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <SettingSunLogo showWordmark variant="dark" className="shrink-0" />

        <div className="relative" ref={rootRef}>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-mk-navy/10 bg-white px-3 py-2 shadow-sm transition hover:border-mk-teal/30 hover:shadow-md"
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="max-w-[180px] truncate text-sm font-semibold text-mk-navy">
              {name}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 text-mk-muted transition", open && "rotate-180")}
              aria-hidden
            />
          </button>

          {open ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-mk-navy/10 bg-white py-1 shadow-xl shadow-mk-navy/15"
            >
              <Link
                href="/candidate/profile"
                role="menuitem"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-mk-slate hover:bg-mk-sand/80"
                onClick={() => setOpen(false)}
              >
                <Pencil className="h-4 w-4 text-mk-teal" aria-hidden />
                Edit profile
              </Link>
              <Link
                href="/candidate/applications"
                role="menuitem"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-mk-slate hover:bg-mk-sand/80"
                onClick={() => setOpen(false)}
              >
                <ClipboardList className="h-4 w-4 text-mk-teal" aria-hidden />
                My applications
              </Link>
              <form action={logoutAction} className="border-t border-mk-navy/8">
                <input type="hidden" name="redirectTo" value="/" />
                <button
                  type="submit"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-mk-slate hover:bg-mk-sand/80"
                >
                  <LogOut className="h-4 w-4 text-mk-muted" aria-hidden />
                  Sign out
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

function isActive(pathname: string, href: string) {
  if (href === "/jobs") return pathname === "/jobs" || pathname.startsWith("/jobs/");
  return (
    pathname === href ||
    (href !== "/candidate" && pathname.startsWith(`${href}/`)) ||
    (href === "/candidate" && pathname === "/candidate")
  );
}

export function CandidatePortalNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="flex gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-8"
      aria-label="Candidate portal"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative shrink-0 pb-2 text-sm font-semibold tracking-wide transition-colors",
              active
                ? "text-mk-navy"
                : "text-mk-muted hover:text-mk-navy",
            )}
          >
            {item.label}
            {active ? (
              <span
                className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-mk-teal"
                aria-hidden
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

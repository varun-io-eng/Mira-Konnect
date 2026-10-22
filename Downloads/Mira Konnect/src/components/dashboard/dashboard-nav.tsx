"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/candidate" &&
            item.href !== "/employer" &&
            item.href !== "/admin" &&
            pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-white text-mk-navy shadow-sm ring-1 ring-mk-navy/10"
                : "text-mk-slate hover:bg-white/80 hover:text-mk-navy",
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/jobs"
        className="rounded-lg px-3 py-2 text-sm font-medium text-mk-muted hover:bg-white/80 hover:text-mk-navy"
      >
        Browse jobs
      </Link>
    </nav>
  );
}

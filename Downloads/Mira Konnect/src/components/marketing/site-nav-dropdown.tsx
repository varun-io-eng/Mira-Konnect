"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

type NavDropdownProps = {
  label: string;
  items: { href: string; label: string }[];
  activePrefix?: string;
  activePaths?: string[];
  className?: string;
};

export function SiteNavDropdown({
  label,
  items,
  activePrefix,
  activePaths,
  className,
}: NavDropdownProps) {
  const pathname = usePathname();
  const active = activePaths?.length
    ? activePaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    : activePrefix != null
      ? pathname === activePrefix || pathname.startsWith(`${activePrefix}/`)
      : items.some((i) => {
          const base = i.href.split("?")[0];
          return pathname === base || pathname.startsWith(`${base}/`);
        });

  return (
    <div className={cn("group relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:bg-mk-sand/80 group-hover:bg-mk-sand/80 group-focus-within:bg-mk-sand/80",
          active && "bg-mk-sand text-mk-teal",
        )}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown
          className="ml-0.5 h-3 w-3 opacity-50 transition group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "absolute right-0 top-full z-[60] min-w-[220px] max-w-[min(100vw-2rem,320px)] pt-2",
          "pointer-events-none opacity-0 translate-y-1 transition duration-150",
          "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0",
          "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0",
        )}
      >
        <div
          role="menu"
          className="max-h-[min(70vh,420px)] overflow-y-auto rounded-2xl border border-mk-navy/10 bg-white py-2 shadow-xl shadow-mk-navy/15"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-medium text-mk-slate hover:bg-mk-sand/80 hover:text-mk-navy"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const aboutItems = [
  { href: "/about", label: "About Mira Konnect" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/faq", label: "FAQ" },
];

export function AboutNavDropdown() {
  return (
    <SiteNavDropdown
      label="About Us"
      items={aboutItems}
      activePaths={["/about", "/how-we-work", "/faq"]}
    />
  );
}

export function IndustriesNavDropdown() {
  const items = industries.map((ind) => ({
    href: `/industries?sector=${ind.slug}`,
    label: ind.name,
  }));
  return <SiteNavDropdown label="Industries" items={items} activePrefix="/industries" />;
}

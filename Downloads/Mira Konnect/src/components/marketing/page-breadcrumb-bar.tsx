import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

export function PageBreadcrumbBar({ items }: { items: Crumb[] }) {
  return (
    <div className="bg-[#0c1524] py-3 text-center text-sm text-white/90">
      <nav aria-label="Breadcrumb">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 ? <span className="mx-2 text-white/50">›</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-mk-teal">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}

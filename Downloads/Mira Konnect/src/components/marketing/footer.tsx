import Link from "next/link";
import { SettingSunLogo } from "@/components/brand/setting-sun-logo";
import { navLinks, siteConfig } from "@/lib/site-config";

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-mk-navy/10 bg-mk-navy text-mk-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <SettingSunLogo variant="light" className="items-start" />
          <p className="mt-3 text-sm leading-relaxed text-mk-sand/80">
            {siteConfig.tagline}. We support employers and job seekers with
            ethical, confidential recruitment across multiple industries in
            India.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-mk-sand/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            For you
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/for-job-seekers" className="hover:text-white">
                Career support & resources
              </Link>
            </li>
            <li>
              <Link href="/for-employers" className="hover:text-white">
                Hiring & staffing solutions
              </Link>
            </li>
            <li>
              <Link href="/how-we-work" className="hover:text-white">
                How we work
              </Link>
            </li>
            <li>
              <Link href="/recruitment-services" className="hover:text-white">
                Recruitment services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-mk-sand/85">
            <li>
              <Link href="/contact" className="hover:text-white">
                Talk to our HR team
              </Link>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>{siteConfig.contact.address}</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs text-mk-sand/70">
            {legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="hover:text-white">
                Publisher sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-mk-sand/60">
        © {new Date().getFullYear()} Mira Konnect. All rights reserved.
      </div>
    </footer>
  );
}

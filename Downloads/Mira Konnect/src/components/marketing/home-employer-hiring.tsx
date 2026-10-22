"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandVisualImage } from "@/components/marketing/brand-visual-image";
import { BrandVisualPanel } from "@/components/marketing/brand-visual-panel";
import { homeImages } from "@/data/home-imagery";
import { Button } from "@/components/ui/button";

export function HomeEmployerHiring() {
  return (
    <section className="relative overflow-hidden bg-mk-sand/35 py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 85%, #e07a5f12 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-mk-teal">
            For employers
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
            Strategic hiring, lasting partnerships
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mk-slate">
            Partner with Mira Konnect for sourcing, screening, interviews, and
            onboarding. We extend your HR team with industry-aware recruiters who
            protect your brand and your candidates&apos; trust.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-mk-slate">
            {[
              "Pharma, manufacturing, IT, hospitality & more",
              "Confidential mandates and ethical shortlisting",
              "Faster pipelines without compromising quality",
            ].map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-mk-coral">✓</span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/for-employers" variant="secondary">Hire Talent</Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mk-navy hover:text-mk-teal"
            >
              Share a requirement
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="order-1 h-full lg:order-2">
          <BrandVisualPanel direction="right" className="h-full">
            <BrandVisualImage
              src={homeImages.employer}
              alt="Strategic hiring — talent streams and partnership light connecting people to a growing organization"
              tint="coral"
            />
          </BrandVisualPanel>
        </div>
      </div>
    </section>
  );
}

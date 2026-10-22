"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandVisualImage } from "@/components/marketing/brand-visual-image";
import { BrandVisualPanel } from "@/components/marketing/brand-visual-panel";
import { homeImages } from "@/data/home-imagery";
import { Button } from "@/components/ui/button";

export function HomeWelcomeSplit() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, #1a7f7a14 0%, transparent 45%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <BrandVisualPanel direction="left" className="h-full">
          <BrandVisualImage
            src={homeImages.candidate}
            alt="Career journey — a professional crossing a bridge of light toward opportunity at sunrise"
            tint="teal"
          />
        </BrandVisualPanel>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-mk-teal">
            For job seekers
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
            Your career, guided with care
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mk-slate">
            Mira Konnect helps you find roles that match your skills and goals—from
            pharmaceuticals and manufacturing to IT and hospitality. We offer job
            matching, resume guidance, and interview preparation with respect for
            your privacy.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-mk-slate">
            {[
              "Roles in Ahmedabad, Mumbai, Vadodara & beyond",
              "Clear updates through every hiring stage",
              "Support built for Indian job markets",
            ].map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-mk-teal">✓</span>
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/jobs">Find Jobs</Button>
            <Link
              href="/for-job-seekers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-mk-teal hover:text-mk-teal-dark"
            >
              Candidate support
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

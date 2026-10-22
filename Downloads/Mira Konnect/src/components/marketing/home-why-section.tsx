"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhyPillarCard } from "@/components/marketing/why-pillar-card";
import { whyHomeImages, whyMiraKonnectReasons } from "@/data/why-mira-konnect";

export function HomeWhySection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal">
            Why Mira Konnect
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-mk-navy sm:text-5xl lg:text-[3.25rem]">
            <span className="block">Capability you can</span>
            <span className="block bg-gradient-to-r from-mk-teal to-mk-navy bg-clip-text text-transparent">
              see and trust
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mk-slate sm:text-lg">
            Five ways we work differently from volume job boards—expert judgment, strategic
            partnerships, and a true bridge between employers and talent.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-mk-navy/10 shadow-xl shadow-mk-navy/10">
          <div className="relative aspect-[21/9] min-h-[200px] w-full bg-mk-navy sm:min-h-[260px] lg:min-h-[300px]">
            <Image
              src={whyHomeImages.hero}
              alt="Bridge connecting employer hiring and professional talent"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-mk-navy/85 via-mk-navy/40 to-mk-navy/20"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#99f6e4]">
                The Konnect bridge
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                Where hiring strategy meets the right people
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                One side is your mandate and brand. The other is skilled talent ready to contribute.
                We connect them with purpose.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {whyMiraKonnectReasons.map((item) => (
            <WhyPillarCard key={item.title} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/how-we-work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-mk-teal hover:text-mk-teal-dark"
          >
            See how we work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

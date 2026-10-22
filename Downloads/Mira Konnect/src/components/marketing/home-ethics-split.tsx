"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const IMG =
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=900&q=80";

export function HomeEthicsSplit() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
            Diversity, ethics & confidentiality
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-mk-muted sm:text-base">
            Mira Konnect is committed to fair, inclusive hiring practices and to
            protecting sensitive information for clients and candidates. We do not
            share private details beyond authorized stakeholders in an active
            search.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mk-muted sm:text-base">
            We serve multiple industries across India—from pharmaceuticals and
            manufacturing to IT and hospitality—with the same professional
            standards on every mandate.
          </p>
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-mk-navy/10">
            <Image
              src={IMG}
              alt="Professional meeting"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

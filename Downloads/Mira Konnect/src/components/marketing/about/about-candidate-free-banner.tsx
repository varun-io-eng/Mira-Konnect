"use client";

import { BadgeCheck, Shield, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandVisualPanel } from "@/components/marketing/brand-visual-panel";
import { AboutStoryPhoto } from "@/components/marketing/about/about-story-photo";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const trustPoints = [
  "No placement or success fees for candidates",
  "No registration or profile charges",
  "No pay-to-apply or premium listing fees",
  "Free interview coordination & application support",
  "Transparent updates at every stage",
  "Ethical, confidential recruitment",
];

function MarqueeRow({ paused }: { paused: boolean }) {
  const items = [...trustPoints, ...trustPoints];

  return (
    <div className="relative overflow-hidden border-t border-white/15 bg-[#071525]/90">
      {paused ? (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
          {trustPoints.map((label) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/90"
            >
              <BadgeCheck className="h-4 w-4 text-[#ffd166]" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex w-max animate-[mk-marquee_45s_linear_infinite] gap-8 py-3.5"
          aria-hidden
        >
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-[13px]"
            >
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#ffd166]" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function AboutCandidateFreeText() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal">Candidate promise</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
          We do <span className="text-mk-teal">not charge</span> job seekers—ever.
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-mk-slate">
          <p>
            {siteConfig.name} is free for candidates. No placement fees, registration charges, or hidden costs.
          </p>
        </div>

        <ul className="mt-8 grid w-full gap-3 text-left sm:grid-cols-2">
          {[
            { title: "Always free", detail: "Apply, interview, and onboard without candidate-side fees." },
            { title: "No fine print", detail: "If a role is listed with us, your access to it is not for sale." },
            { title: "Human support", detail: "Career guidance and coordination at no cost to you." },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-mk-navy/10 bg-gray-50 px-4 py-3"
            >
              <p className="text-sm font-semibold text-mk-navy">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-mk-slate">{item.detail}</p>
            </li>
          ))}
        </ul>

        <Button href="/how-we-work" variant="outline" className="mt-6 gap-2 w-fit">
          See our process
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col justify-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
      }}
    >
      <motion.p
        className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal"
        variants={{
          hidden: { opacity: 0, x: -72 },
          show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
        }}
      >
        Candidate promise
      </motion.p>
      <motion.h2
        className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl"
        variants={{
          hidden: { opacity: 0, x: -72 },
          show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
        }}
      >
        We do <span className="text-mk-teal">not charge</span> job seekers—ever.
      </motion.h2>
      <motion.div
        className="mt-6 space-y-4 text-base leading-relaxed text-mk-slate"
        variants={{
          hidden: { opacity: 0, x: -72 * 0.85 },
          show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
        }}
      >
        <p>
          {siteConfig.name} is free for candidates. No placement fees, registration charges, or hidden costs.
        </p>
      </motion.div>

      <motion.ul
        className="mt-8 grid w-full gap-3 text-left sm:grid-cols-2"
        variants={{
          hidden: { opacity: 0, x: -72 * 0.85 },
          show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
        }}
      >
        {[
          { title: "Always free", detail: "Apply, interview, and onboard without candidate-side fees." },
          { title: "No fine print", detail: "If a role is listed with us, your access to it is not for sale." },
          { title: "Human support", detail: "Career guidance and coordination at no cost to you." },
        ].map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-mk-navy/10 bg-gray-50 px-4 py-3"
          >
            <p className="text-sm font-semibold text-mk-navy">{item.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-mk-slate">{item.detail}</p>
          </li>
        ))}
      </motion.ul>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: -72 * 0.85 },
          show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
        }}
      >
        <Button href="/how-we-work" variant="outline" className="mt-6 gap-2 w-fit">
          See our process
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function AboutCandidateFreeBanner() {
  return (
    <section
      className="relative overflow-hidden border-b border-mk-navy/10"
      aria-labelledby="about-candidate-free-heading"
    >
      <div className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
          <div className="order-1 lg:order-1 flex items-center h-full">
            <img
              src="/images/about/candidate-promise.jpg"
              alt="Young professionals collaborating with career development resources"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="order-2 lg:order-2 flex flex-col justify-center">
            <AboutCandidateFreeText />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HomeIndustryCard } from "@/components/marketing/home-industry-card";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries";

const ease = [0.22, 1, 0.36, 1] as const;

/** Homepage preview — four of many sectors; full list on /industries */
const homeIndustries = industries.slice(0, 4);

export function HomeIndustriesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-mk-navy/5 bg-gradient-to-b from-mk-sand/25 via-white to-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal">
            Sector expertise
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">
            A few of the many industries we work with
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mk-slate sm:text-lg">
            Four sectors shown here from our wider specializations—each with tailored hiring
            insight. Explore all {industries.length} on our industries page.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:gap-8"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {homeIndustries.map((ind) => (
            <motion.div
              key={ind.slug}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <HomeIndustryCard industry={ind} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-mk-navy hover:text-mk-teal"
          >
            View all industries we work with
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <span className="hidden h-4 w-px bg-mk-navy/15 sm:block" aria-hidden />
          <Button href="/contact" variant="outline" size="sm">
            Discuss your hiring needs
          </Button>
        </div>
      </div>
    </section>
  );
}

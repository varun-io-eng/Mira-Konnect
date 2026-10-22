"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { JobSearchForm } from "@/components/jobs/job-search-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function HeroJobSearch() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-b border-mk-navy/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mk-sand/80 via-white to-mk-teal/5" />
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-mk-teal/15 blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-mk-teal"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {siteConfig.name}
          </motion.p>
          <motion.h1
            className="mt-4 font-display text-4xl font-semibold leading-tight text-mk-navy sm:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Want your next career move?
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-lg text-mk-slate"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            {siteConfig.tagline}. Search open roles or partner with us to hire
            talent across India.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          <JobSearchForm variant="hero" candidateFlow />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Button href="/for-employers" variant="outline">
            Hire Talent
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-mk-teal hover:text-mk-teal-dark"
          >
            Talk to Our HR Team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Industries", value: "10+" },
            { label: "Services", value: "End-to-end" },
            { label: "Focus", value: "India" },
            { label: "Approach", value: "Human-first" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-mk-navy/10 bg-white/80 px-4 py-5 text-center backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <p className="font-display text-xl font-semibold text-mk-navy">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-mk-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

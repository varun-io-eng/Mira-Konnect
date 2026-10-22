"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteHeader } from "@/components/marketing/site-header";
import { PageBreadcrumbBar } from "@/components/marketing/page-breadcrumb-bar";
import { JobSearchForm } from "@/components/jobs/job-search-form";
import { KenBurnsImage } from "@/components/motion/ken-burns-image";
import { Button } from "@/components/ui/button";
import { findJobPath } from "@/lib/find-job";
import { homeImages } from "@/data/home-imagery";
import { siteConfig } from "@/lib/site-config";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HomeHeroTekStyle() {
  const reduce = useReducedMotion();

  return (
    <section className="relative">
      <SiteHeader overlay />
      <div className="relative min-h-[min(88vh,760px)] overflow-hidden bg-mk-navy">
        <KenBurnsImage
          src={homeImages.hero}
          alt="Employers and candidates connected — professionals on either side of a partnership moment"
          priority
          objectPosition="55% center"
          overlayClassName="bg-gradient-to-r from-[#071525]/92 via-[#0f2744]/55 to-[#0f2744]/25"
        />
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#071525] to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        )}
        <div className="relative z-10 mx-auto flex min-h-[min(88vh,760px)] max-w-7xl items-center px-4 pb-16 pt-28 lg:px-8">
          <div className="max-w-xl text-left lg:max-w-2xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-xs font-bold uppercase tracking-[0.3em] text-mk-teal"
            >
              Mira Konnect
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.25rem]"
            >
              {siteConfig.tagline}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 text-lg text-white/85"
            >
              Premium recruitment across India—human, confidential, and focused on
              the right fit for employers and candidates.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8"
            >
              <JobSearchForm variant="hero" candidateFlow />
            </motion.div>
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button href="/contact" variant="secondary">Hire Talent</Button>
              <Button
                href={findJobPath()}
                variant="outline"
                className="border-white/35 bg-white/10 text-white hover:bg-white/20"
              >
                Find a Job
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <PageBreadcrumbBar items={[{ label: "Home", href: "/" }, { label: "Mira Konnect" }]} />
    </section>
  );
}

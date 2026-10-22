"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandVisualPanel } from "@/components/marketing/brand-visual-panel";
import { AboutStoryPhoto } from "@/components/marketing/about/about-story-photo";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type AboutStorySectionProps = {
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
};

function AboutStoryText({
  direction,
  eyebrow,
  title,
  children,
}: {
  direction: "left" | "right";
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const enterX = direction === "left" ? -72 : 72;

  if (reduce) {
    return (
      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-mk-teal">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl">{title}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-mk-slate">{children}</div>
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
          hidden: { opacity: 0, x: enterX },
          show: { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
        }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="mt-3 font-display text-3xl font-semibold text-mk-navy sm:text-4xl"
        variants={{
          hidden: { opacity: 0, x: enterX },
          show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mt-6 space-y-4 text-base leading-relaxed text-mk-slate"
        variants={{
          hidden: { opacity: 0, x: enterX * 0.85 },
          show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function AboutStorySection({
  imageSrc,
  imageAlt,
  imageSide,
  eyebrow,
  title,
  children,
  className,
}: AboutStorySectionProps) {
  const textFrom = imageSide === "left" ? "right" : "left";

  const imagePanel = (
    <BrandVisualPanel direction={imageSide} delay={0}>
      <AboutStoryPhoto src={imageSrc} alt={imageAlt} />
    </BrandVisualPanel>
  );

  const textBlock = (
    <AboutStoryText direction={textFrom} eyebrow={eyebrow} title={title}>
      {children}
    </AboutStoryText>
  );

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {imageSide === "left" ? (
          <>
            <div className="order-1">{imagePanel}</div>
            <div className="order-2">{textBlock}</div>
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1">{textBlock}</div>
            <div className="order-1 lg:order-2">{imagePanel}</div>
          </>
        )}
      </div>
    </section>
  );
}

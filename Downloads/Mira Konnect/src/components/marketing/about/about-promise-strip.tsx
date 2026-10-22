"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { aboutExpectImages } from "@/data/about-expect";

const promises = [
  {
    title: "Clear briefs",
    body: "We capture role scope, success metrics, and culture before sourcing begins—so every step on the path has a destination.",
    image: aboutExpectImages[0],
    direction: "left" as const,
  },
  {
    title: "Ethical process",
    body: "Confidential mandates, transparent updates, and respectful communication with every candidate and hiring manager.",
    image: aboutExpectImages[1],
    direction: "up" as const,
  },
  {
    title: "Offer to joining",
    body: "We stay involved through negotiation and onboarding so hires land well and teams grow together.",
    image: aboutExpectImages[2],
    direction: "right" as const,
  },
];

function ExpectCard({
  item,
}: {
  item: (typeof promises)[number];
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-mk-navy/10 bg-white shadow-md shadow-mk-navy/5"
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-cover object-center transition duration-500 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-mk-navy">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mk-slate">{item.body}</p>
      </div>
    </motion.article>
  );
}

export function AboutPromiseStrip() {
  return (
    <section className="border-y border-mk-navy/5 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center" direction="up" scale>
          <h2 className="font-display text-2xl font-semibold text-mk-navy sm:text-3xl">
            What to expect from us
          </h2>
          <p className="mt-3 text-sm text-mk-slate sm:text-base">
            Three commitments behind every search we run.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 sm:grid-cols-3" staggerMs={0.14}>
          {promises.map((item) => (
            <StaggerItem key={item.title} direction={item.direction === "up" ? "up" : item.direction}>
              <ExpectCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

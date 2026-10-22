"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { recruitmentProcessSteps } from "@/data/process-steps";
import { Reveal } from "@/components/motion/reveal";

export function ProcessStepsCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % recruitmentProcessSteps.length);
    }, 4500);
    return () => clearInterval(id);
  }, [reduce]);

  const step = recruitmentProcessSteps[active];

  return (
    <section className="py-20 bg-mk-navy text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            How recruitment works with Mira Konnect
          </h2>
          <p className="mt-3 max-w-2xl text-mk-sand/80">
            A transparent, step-by-step journey from requirement to joining for
            employers and candidates.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {recruitmentProcessSteps.map((s, i) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  i === active
                    ? "bg-mk-teal text-white shadow-md"
                    : "bg-white/10 text-mk-sand/90 hover:bg-white/15"
                }`}
              >
                Step {s.step}
              </button>
            ))}
          </div>

          <div className="relative min-h-[200px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.step}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-sm font-bold uppercase tracking-widest text-mk-teal">
                  Step {step.step}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mk-sand/85">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
          {recruitmentProcessSteps.map((s, i) => (
            <motion.div
              key={s.step}
              className={`min-w-[200px] snap-start rounded-2xl border p-5 transition-colors ${
                i === active
                  ? "border-mk-teal bg-mk-teal/20"
                  : "border-white/10 bg-white/5"
              }`}
              animate={reduce ? undefined : { scale: i === active ? 1.02 : 1 }}
            >
              <p className="text-xs font-bold text-mk-teal">0{s.step}</p>
              <p className="mt-2 text-sm font-semibold">{s.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

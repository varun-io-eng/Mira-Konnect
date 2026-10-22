"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { candidateTestimonials } from "@/data/candidate-testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COUNT = candidateTestimonials.length;
const AUTO_MS = 5000;

function wrapIndex(i: number) {
  return ((i % COUNT) + COUNT) % COUNT;
}

/* ================================================================== */
/*  Main Export                                                        */
/* ================================================================== */

export function HomeCandidateTestimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Auto‑rotate every 5 s */
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((a) => wrapIndex(a + 1)),
      AUTO_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  const go = useCallback((dir: 1 | -1) => {
    setActive((a) => wrapIndex(a + dir));
    setPaused(true);
    setTimeout(() => setPaused(false), AUTO_MS);
  }, []);

  // Get 3 testimonials to display: prev, current, next
  const getVisibleTestimonials = () => {
    const prev = wrapIndex(active - 1);
    const current = active;
    const next = wrapIndex(active + 1);
    return [prev, current, next];
  };

  const visibleIndices = getVisibleTestimonials();

  // Create a key for the carousel to trigger animations when active changes
  const carouselKey = visibleIndices.join('-');

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background)] py-20 sm:py-24 lg:py-32"
      aria-labelledby="home-testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header with navigation ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 lg:mb-16"
        >
          <div className="flex-1">
            <h2
              id="home-testimonials-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-mk-navy leading-[1.1] mb-2"
            >
              What Our{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Candidate</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-mk-teal/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 Q50 2 100 8 T198 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Say About Mira Konnect
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-mk-navy/20 text-mk-navy/60 transition-all duration-300 hover:border-mk-navy hover:text-mk-navy hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-mk-teal text-white shadow-lg shadow-mk-teal/30 transition-all duration-300 hover:bg-mk-teal-dark hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* ── 3 Horizontal Cards ── */}
        <motion.div
          key={carouselKey}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {visibleIndices.map((idx, cardIndex) => {
            const item = candidateTestimonials[idx];
            const isMiddle = cardIndex === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: cardIndex * 0.1 }}
                className={`rounded-2xl p-5 flex flex-col h-[480px] overflow-hidden ${
                  isMiddle
                    ? "bg-mk-teal text-white shadow-xl shadow-mk-teal/30"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {/* Profile */}
                <div className="flex items-center gap-3 mb-4 shrink-0">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isMiddle
                        ? "bg-white text-mk-teal"
                        : "bg-mk-teal text-white"
                    }`}
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <p
                      className={`font-semibold text-sm truncate ${
                        isMiddle ? "text-white" : "text-mk-navy"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        isMiddle ? "text-white/80" : "text-mk-slate"
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 mb-4 overflow-hidden">
                  <p
                    className={`text-sm leading-relaxed overflow-hidden ${
                      isMiddle ? "text-white/90" : "text-mk-slate"
                    }`}
                  >
                    &ldquo;{item.body}&rdquo;
                  </p>
                </div>

                {/* Company name */}
                {item.company && (
                  <p
                    className={`text-xs font-semibold shrink-0 ${
                      isMiddle ? "text-white/90" : "text-mk-teal"
                    }`}
                  >
                    {item.company}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

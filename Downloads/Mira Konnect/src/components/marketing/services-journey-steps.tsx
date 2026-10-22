"use client";



import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { SnapHandIcon } from "@/components/icons/snap-hand-icon";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ServicesJourney } from "@/data/services-journey-steps";

import { cn } from "@/lib/utils";



const AUTO_MS = 4000;

const VISIBLE_COUNT = 3;

const slideEase = [0.22, 1, 0.36, 1] as const;

const slideTransition = { duration: 0.55, ease: slideEase };



type ServicesJourneyStepsProps = {

  journey: ServicesJourney;

  className?: string;

};



function StepColumn({

  index,

  title,

  description,

  emphasized,

}: {

  index: number;

  title: string;

  description: string;

  emphasized?: boolean;

}) {

  return (

    <div

      className={cn(

        "min-w-0 flex-1 px-1 text-left sm:px-2",

        emphasized ? "opacity-100" : "opacity-80",

      )}

    >

      <span

        className={cn(

          "font-display text-4xl font-semibold tabular-nums sm:text-5xl",

          emphasized ? "text-mk-teal" : "text-mk-teal/50",

        )}

      >

        {String(index + 1).padStart(2, "0")}

      </span>

      <h3 className="mt-3 text-base font-semibold leading-snug text-mk-navy sm:mt-4 sm:text-lg">

        {title}

      </h3>

      <div className="mt-3 h-px w-full bg-mk-navy/15 sm:mt-4" aria-hidden />

      <p className="mt-3 text-xs leading-relaxed text-mk-slate sm:mt-4 sm:text-sm">

        {description}

      </p>

    </div>

  );

}



export function ServicesJourneySteps({ journey, className }: ServicesJourneyStepsProps) {

  const reduceMotion = useReducedMotion();

  const [windowStart, setWindowStart] = useState(0);

  const [direction, setDirection] = useState(1);

  const [paused, setPaused] = useState(false);

  const [progressKey, setProgressKey] = useState(0);



  const total = journey.steps.length;

  const maxStart = Math.max(0, total - VISIBLE_COUNT);



  const visibleSteps = useMemo(() => {

    if (total <= VISIBLE_COUNT) {

      return journey.steps.map((step, i) => ({ step, index: i }));

    }

    return Array.from({ length: VISIBLE_COUNT }, (_, i) => ({

      step: journey.steps[windowStart + i],

      index: windowStart + i,

    }));

  }, [journey.steps, total, windowStart]);



  const focusIndex = visibleSteps[visibleSteps.length - 1]?.index ?? 0;



  const shift = useCallback(

    (dir: -1 | 1) => {

      setDirection(dir);

      setWindowStart((start) => {

        if (total <= VISIBLE_COUNT) return 0;

        if (dir === 1) {

          return start >= maxStart ? 0 : start + 1;

        }

        return start <= 0 ? maxStart : start - 1;

      });

      setProgressKey((k) => k + 1);

    },

    [maxStart, total],

  );



  useEffect(() => {

    if (reduceMotion || paused || total <= VISIBLE_COUNT) return;

    const id = window.setInterval(() => {

      shift(1);

    }, AUTO_MS);

    return () => window.clearInterval(id);

  }, [paused, reduceMotion, shift, total]);



  return (

    <section

      className={cn(className)}

      aria-labelledby={`${journey.id}-journey-heading`}

      onMouseEnter={() => setPaused(true)}

      onMouseLeave={() => setPaused(false)}

    >

      <div className="flex justify-center">

        <SnapHandIcon />

      </div>

      <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-mk-teal">

        {journey.eyebrow}

      </p>

      <h2

        id={`${journey.id}-journey-heading`}

        className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-semibold leading-tight text-mk-navy sm:text-4xl"

      >

        {journey.headline}

      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-mk-slate sm:text-base">

        {journey.intro}

      </p>



      <div className="relative mx-auto mt-12 max-w-6xl">

        <button

          type="button"

          onClick={() => shift(-1)}

          disabled={total <= VISIBLE_COUNT}

          className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-mk-navy/12 bg-white p-2 text-mk-navy shadow-sm transition hover:border-mk-teal/40 hover:text-mk-teal disabled:opacity-40 sm:-left-12 sm:p-2.5"

          aria-label="Previous steps"

        >

          <ChevronLeft className="h-5 w-5" />

        </button>

        <button

          type="button"

          onClick={() => shift(1)}

          disabled={total <= VISIBLE_COUNT}

          className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-mk-navy/12 bg-white p-2 text-mk-navy shadow-sm transition hover:border-mk-teal/40 hover:text-mk-teal disabled:opacity-40 sm:-right-12 sm:p-2.5"

          aria-label="Next steps"

        >

          <ChevronRight className="h-5 w-5" />

        </button>



        <div className="overflow-hidden px-8 sm:px-10">

          <AnimatePresence mode="wait" initial={false} custom={direction}>

            <motion.div

              key={windowStart}

              custom={direction}

              initial={

                reduceMotion || total <= VISIBLE_COUNT

                  ? false

                  : { opacity: 0, x: direction > 0 ? 72 : -72 }

              }

              animate={{ opacity: 1, x: 0 }}

              exit={

                reduceMotion || total <= VISIBLE_COUNT

                  ? undefined

                  : { opacity: 0, x: direction > 0 ? -72 : 72 }

              }

              transition={slideTransition}

              className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-y-6"

            >

              {visibleSteps.map(({ step, index }, col) => (

                <Fragment key={`${windowStart}-${index}`}>

                  <StepColumn

                    index={index}

                    title={step.title}

                    description={step.description}

                    emphasized={index === focusIndex}

                  />

                  {col < visibleSteps.length - 1 ? (

                    <div

                      className="flex items-center self-center px-1 pt-12 text-mk-navy/20 sm:px-2"

                      aria-hidden

                    >

                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />

                    </div>

                  ) : null}

                </Fragment>

              ))}

            </motion.div>

          </AnimatePresence>



          {!reduceMotion && !paused && total > VISIBLE_COUNT ? (

            <div

              key={progressKey}

              className="mx-2 mt-8 h-0.5 overflow-hidden rounded-full bg-mk-navy/10"

              aria-hidden

            >

              <motion.div

                className="h-full bg-mk-teal"

                initial={{ scaleX: 0 }}

                animate={{ scaleX: 1 }}

                transition={{ duration: AUTO_MS / 1000, ease: "linear" }}

                style={{ transformOrigin: "left center" }}

              />

            </div>

          ) : null}

        </div>

      </div>

    </section>

  );

}



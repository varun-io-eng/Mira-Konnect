"use client";



import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

import { whyMiraKonnectReasons } from "@/data/why-mira-konnect";



export function WhyChooseGrid() {

  return (

    <section className="border-b border-mk-navy/5 bg-white py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center">

          <h2 className="font-display text-3xl font-semibold text-mk-navy sm:text-4xl">

            Why choose Mira Konnect

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-mk-slate">

            Professional recruitment should feel clear, respectful, and efficient—for

            companies hiring and people building their careers.

          </p>

        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {whyMiraKonnectReasons.map((item) => (

            <StaggerItem key={item.title}>

              <article

                className="group h-full rounded-2xl border border-mk-navy/10 bg-mk-sand/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mk-teal/30 hover:shadow-lg hover:shadow-mk-teal/5"

              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mk-teal/10 text-mk-teal transition-colors group-hover:bg-mk-teal group-hover:text-white">

                  <item.icon className="h-6 w-6" aria-hidden />

                </div>

                <h3 className="mt-5 font-semibold text-mk-navy">{item.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-mk-slate">{item.body}</p>

              </article>

            </StaggerItem>

          ))}

        </Stagger>

      </div>

    </section>

  );

}



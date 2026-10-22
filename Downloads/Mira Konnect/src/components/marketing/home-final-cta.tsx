"use client";



import { Button } from "@/components/ui/button";



export function HomeFinalCta() {

  return (

    <section className="border-t border-mk-navy/10 bg-gradient-to-b from-mk-sand/50 to-white py-20">

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

        <h2 className="font-display text-3xl font-semibold text-mk-navy">

          Ready to move forward?

        </h2>

        <p className="mt-4 text-mk-slate">

          Search openings, submit a hiring requirement, or speak with the Mira

          Konnect HR team today.

        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <Button href="/jobs" size="lg">Find Jobs</Button>

          <Button href="/contact" variant="secondary" size="lg">

            Talk to Our HR Team

          </Button>

        </div>

      </div>

    </section>

  );

}



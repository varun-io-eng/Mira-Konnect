"use client";

import { MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const hubs = [
  { city: "Ahmedabad", region: "Gujarat, India" },
  { city: "Mumbai", region: "Maharashtra, India" },
  { city: "Vadodara", region: "Gujarat, India" },
  { city: "Surat", region: "Gujarat, India" },
];

export function LocationsStrip() {
  return (
    <section className="border-t border-mk-navy/10 bg-mk-sand/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-mk-navy">
            Where we work
          </h2>
          <p className="mt-3 max-w-xl text-mk-slate">
            Mira Konnect supports clients and candidates across Gujarat and major
            Indian cities—connect with our HR team for your location.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hubs.map((hub) => (
            <StaggerItem key={hub.city}>
              <div className="flex gap-3 rounded-2xl border border-mk-navy/10 bg-white p-5 transition-shadow hover:shadow-md">
                <MapPin className="h-5 w-5 shrink-0 text-mk-teal" aria-hidden />
                <div>
                  <p className="font-semibold text-mk-navy">{hub.city}</p>
                  <p className="text-sm text-mk-muted">{hub.region}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Button href="/contact" className="mt-10">Contact Mira Konnect</Button>
      </div>
    </section>
  );
}

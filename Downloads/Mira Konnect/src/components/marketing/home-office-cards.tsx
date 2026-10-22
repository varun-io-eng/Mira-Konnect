"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    title: "Collaborative hiring",
    text:
      "Our recruiters work closely with your HR and hiring managers so requirements stay clear from brief to shortlist.",
    imageFirst: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
    title: "Spaces that inspire focus",
    text:
      "We bring the same clarity to candidate experience—timely updates, interview coordination, and respectful communication.",
    imageFirst: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    title: "Technology-enabled process",
    text:
      "Modern tools support search and tracking; relationships and expertise still drive every placement decision.",
    imageFirst: true,
  },
];

export function HomeOfficeCards() {
  return (
    <section className="bg-mk-sand/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold text-mk-navy sm:text-3xl lg:text-4xl">
            Our approach is designed to promote trust and collaboration
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <article
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-mk-navy/5 transition-transform duration-300 hover:-translate-y-1"
              >
                {card.imageFirst ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-semibold text-mk-navy">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mk-muted">
                    {card.text}
                  </p>
                </div>
                {!card.imageFirst ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

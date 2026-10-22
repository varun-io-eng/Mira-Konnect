"use client";

import { Reveal } from "@/components/motion/reveal";
import { IndustrySectorPhoto } from "@/components/marketing/industries/industry-sector-photo";
import { getIndustrySpecialization } from "@/data/industry-specialization";
import { getIndustrySectorDualImages } from "@/data/industry-sector-images";
import { industries } from "@/data/industries";

function ExpertiseList({
  lead,
  areas,
}: {
  lead: string;
  areas: { label: string; body: string }[];
}) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-mk-slate">
      <p>{lead}</p>
      <ul className="space-y-4">
        {areas.map((area) => (
          <li key={area.label}>
            <span className="font-semibold text-mk-navy">{area.label}</span> {area.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

type IndustrySpecializationViewProps = {
  slug: string;
};

export function IndustrySpecializationView({ slug }: IndustrySpecializationViewProps) {
  const industry = industries.find((i) => i.slug === slug) ?? industries[0];
  const spec = getIndustrySpecialization(industry.slug);
  const photos = getIndustrySectorDualImages(industry.slug);

  return (
    <article className="mt-10 border-t border-mk-navy/10 pt-12">
      <Reveal className="mx-auto max-w-4xl px-2 text-center">
        <h2 className="font-display text-3xl font-semibold text-[#1e4d7b] sm:text-4xl">
          Our {industry.name} specialization
        </h2>
      </Reveal>

      <div className="mx-auto mt-16 max-w-7xl space-y-20 px-2 sm:space-y-24 sm:px-4 lg:space-y-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Reveal direction="right" className="order-2 px-1 lg:order-1 lg:pr-6 xl:pr-10">
            <h3 className="font-display text-2xl font-semibold text-mk-navy sm:text-3xl">
              How we support {industry.name.split(" ")[0]} hiring
            </h3>
            <div className="mt-6">
              <ExpertiseList lead={spec.expertiseLead} areas={spec.expertiseAreas} />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:pl-2 xl:pl-4">
            {photos?.a ? (
              <IndustrySectorPhoto
                src={photos.a}
                alt={`${industry.name} — recruitment and operations`}
                slug={industry.slug}
              />
            ) : null}
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="order-1 lg:pr-2 xl:pr-4">
            {photos?.b ? (
              <IndustrySectorPhoto
                src={photos.b}
                alt={`${industry.name} — teams and workplaces`}
                slug={industry.slug}
              />
            ) : null}
          </div>
          <Reveal direction="left" className="order-2 px-1 lg:pl-6 xl:pl-10">
            <h3 className="font-display text-2xl font-semibold text-mk-navy sm:text-3xl">
              Specialist and senior mandates
            </h3>
            <div className="mt-6">
              <ExpertiseList lead={spec.depthLead} areas={spec.depthAreas} />
            </div>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-mk-slate">
              {spec.closingParagraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-mk-muted">
              <span className="font-semibold uppercase tracking-wide text-mk-navy">
                Typical roles:{" "}
              </span>
              {industry.roles}
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

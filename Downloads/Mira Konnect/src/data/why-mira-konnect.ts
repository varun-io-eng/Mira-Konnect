import type { LucideIcon } from "lucide-react";
import { Award, Globe2, Handshake, Link2, Users } from "lucide-react";

export const whyHomeImages = {
  hero: "/images/why/konnect-bridge.png",
  expertReview: "/images/why/expert-review.png",
  strategicPartnership: "/images/why/strategic-partnership.png",
  indiaIndustries: "/images/why/india-industries.png",
  briefToOffer: "/images/why/brief-to-offer.jpg",
  cultureFitTrust: "/images/why/culture-fit-trust.jpg",
} as const;

export type WhyReason = {
  icon: LucideIcon;
  title: string;
  body: string;
  difference: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
};

/** Five pillars — each mapped to a supplied visual where possible */
export const whyMiraKonnectReasons: WhyReason[] = [
  {
    icon: Users,
    difference: "Human expertise",
    image: whyHomeImages.expertReview,
    imageAlt: "Recruiter reviewing a candidate profile with expert and culture-fit judgment",
    objectPosition: "55% center",
    title: "Expert-led shortlisting",
    body:
      "Real recruiters assess skill, intent, and culture fit—not automated keyword filters or résumé spam.",
  },
  {
    icon: Handshake,
    difference: "Built to last",
    image: whyHomeImages.strategicPartnership,
    imageAlt: "Hands placing a partnership piece on a strategic hiring model",
    objectPosition: "center",
    title: "Strategic partnerships",
    body:
      "We design hiring like a mandate you can trust—aligned to your goals, timelines, and employer brand.",
  },
  {
    icon: Globe2,
    difference: "Nationwide reach",
    image: whyHomeImages.indiaIndustries,
    imageAlt: "Map of India showing connected industries and cities",
    objectPosition: "center",
    title: "Pan-India industry depth",
    body:
      "Pharma, manufacturing, IT, hospitality, FMCG, and more—networked across the markets you hire in.",
  },
  {
    icon: Link2,
    difference: "End-to-end",
    image: whyHomeImages.briefToOffer,
    imageAlt: "Hiring team mapping the journey from brief to offer",
    objectPosition: "center",
    title: "From brief to offer",
    body:
      "Sourcing, screening, interviews, and onboarding support—one accountable partner through the journey.",
  },
  {
    icon: Award,
    difference: "Culture-fit",
    image: whyHomeImages.cultureFitTrust,
    imageAlt: "Professional conversation focused on culture fit and mutual trust",
    objectPosition: "center",
    title: "Judgment you can trust",
    body:
      "Strategic fit and respectful communication—so employers and candidates always know where they stand.",
  },
];

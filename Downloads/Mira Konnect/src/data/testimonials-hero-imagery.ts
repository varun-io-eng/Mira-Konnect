import type { HeroScene } from "@/components/motion/hero-living-scenes";

import { candidateTestimonials } from "@/data/candidate-testimonials";



/** Dark upward skyline / glass-tower mood — matches home testimonial card look */

const u = (id: string) =>

  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=88`;



/** One background per testimonial id — keep keys in sync with `candidate-testimonials.ts` */

export const testimonialBackgroundById: Record<string, HeroScene> = {

  "sarang-vyawahare": {

    src: u("photo-1486406146926-c627a92ad1ab"),

    alt: "Glass towers rising into the sky",

    objectPosition: "50% 40%",

  },

  "dharmik-darji": {

    src: u("photo-1449824913935-59a10b8d2000"),

    alt: "City skyscrapers at dusk",

    objectPosition: "50% 35%",

  },

  "chirag-kalsariya": {

    src: u("photo-1477959858617-67f85cf4f1df"),

    alt: "Urban skyline with dramatic light",

    objectPosition: "50% 45%",

  },

  "ganesh-polasa": {

    src: u("photo-1519501025264-65ba15a82390"),

    alt: "Modern high-rise architecture",

    objectPosition: "48% 38%",

  },

  "ritesh-kevat": {

    src: u("photo-1497366754035-f200968a6e72"),

    alt: "Contemporary office building exterior",

    objectPosition: "50% 42%",

  },

};



const fallbackScenes: HeroScene[] = Object.values(testimonialBackgroundById);



export function testimonialBackgroundFor(

  testimonialId: string,

  slideIndex: number,

): HeroScene {

  const scene = testimonialBackgroundById[testimonialId];

  if (scene) return scene;

  return fallbackScenes[slideIndex % fallbackScenes.length] ?? fallbackScenes[0];

}



/** Ordered like `candidateTestimonials` — used by home carousel */

export function testimonialBackgroundsInOrder(): HeroScene[] {

  return candidateTestimonials.map((t, i) => testimonialBackgroundFor(t.id, i));

}



export const testimonialsHeroVisuals = {

  intervalMs: 4000,

  overlayClassName: "bg-transparent",

  scenes: testimonialBackgroundsInOrder(),

};



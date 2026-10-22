import type { LucideIcon } from "lucide-react";

import {

  Banknote,

  Cpu,

  Factory,

  FlaskConical,

  Gem,

  GraduationCap,

  Megaphone,

  Package,

  Shirt,

  UtensilsCrossed,

} from "lucide-react";



export type IndustryItem = {

  name: string;

  slug: string;

  description: string;

  roles: string;

  /** Short footer line on home industry cards */
  tagline: string;

  icon: LucideIcon;

};



export const industries: IndustryItem[] = [

  {

    name: "Pharmaceuticals & Lifesciences",

    slug: "pharmaceuticals-lifesciences",

    icon: FlaskConical,

    description:

      "Recruitment support for regulated, quality-driven lifescience organizations.",

    roles: "Sales, Medical Representatives, Quality, Production, Regulatory, Operations",

    tagline: "Research. Innovation. Healthier Lives.",

  },

  {

    name: "Manufacturing & Engineering",

    slug: "manufacturing-engineering",

    icon: Factory,

    description:

      "Talent for production floors, engineering teams, and industrial operations.",

    roles: "Production, Quality, Maintenance, Engineering, Operations",

    tagline: "Building Progress. Powering Industries.",

  },

  {

    name: "Hospitality",

    slug: "hospitality",

    icon: UtensilsCrossed,

    description: "Front-of-house and kitchen talent for hotels, restaurants, and F&B.",

    roles: "Chef, F&B Service, Front Office, Housekeeping, Operations",

    tagline: "People. Experiences. Memorable Journeys.",

  },

  {

    name: "IT",

    slug: "it",

    icon: Cpu,

    description: "Technology roles from implementation to engineering and support.",

    roles: "Software, Infrastructure, QA, Support, Project Delivery",

    tagline: "Ideas to Solutions. Driven by Technology.",

  },

  {

    name: "Gems & Jewellery",

    slug: "gems-jewellery",

    icon: Gem,

    description: "Specialist hiring for design, production, and retail in jewellery.",

    roles: "Design, Merchandising, Production, Sales, Quality",

    tagline: "Craftsmanship. Elegance. Timeless Value.",

  },

  {

    name: "Textiles",

    slug: "textiles",

    icon: Shirt,

    description: "Workforce solutions for textile manufacturing and apparel operations.",

    roles: "Production, Merchandising, Quality, Supply Chain, Operations",

    tagline: "Threads of Growth. Woven for a Better Tomorrow.",

  },

  {

    name: "Banking & Insurance",

    slug: "banking-insurance",

    icon: Banknote,

    description: "Professional hiring for financial services and insurance operations.",

    roles: "Sales, Operations, Underwriting, Customer Service, Compliance",

    tagline: "Financial Security. Brighter Futures.",

  },

  {

    name: "EdTech",

    slug: "edtech",

    icon: GraduationCap,

    description: "Roles across content, delivery, technology, and learner success.",

    roles: "Instruction, Product, Technology, Sales, Operations",

    tagline: "Learning Today. Leading Tomorrow.",

  },

  {

    name: "Digital Marketing",

    slug: "digital-marketing",

    icon: Megaphone,

    description: "Creative and performance talent for modern marketing teams.",

    roles: "SEO, Performance, Content, Social, Analytics",

    tagline: "Ideas. Visibility. Real Impact.",

  },

  {

    name: "FMCG",

    slug: "fmcg",

    icon: Package,

    description: "Fast-moving consumer goods hiring for field and corporate teams.",

    roles: "Sales, Supply Chain, Brand, Production, Quality",

    tagline: "Everyday Essentials. For a Better Life.",

  },

];



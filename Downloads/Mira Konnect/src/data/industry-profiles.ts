export type IndustryProfile = {
  overview: string;
  hiringLandscape: string;
  howWeHelp: string;
  highlights: string[];
};

export const industryProfiles: Record<string, IndustryProfile> = {
  "pharmaceuticals-lifesciences": {
    overview:
      "Regulated lifescience teams need recruiters who understand compliance, batch release cycles, and field-force scale-up without compromising quality.",
    hiringLandscape:
      "Demand spans medical representatives, QA/QC, production, regulatory affairs, and plant leadership—often with strict documentation and audit readiness.",
    howWeHelp:
      "We screen for domain vocabulary, stability in regulated environments, and ethical promotion practices before you invest interview bandwidth.",
    highlights: ["GxP-aware screening", "Field & plant hiring", "Confidential replacement search"],
  },
  "manufacturing-engineering": {
    overview:
      "Manufacturing success depends on supervisors who understand safety, throughput, and shop-floor culture—not just résumé keywords.",
    hiringLandscape:
      "Roles range from CNC and maintenance to production planning, quality engineering, and operations leadership across shifts.",
    howWeHelp:
      "We map technical skills to your plant standards, verify tenure patterns, and coordinate shift-friendly interview windows.",
    highlights: ["Shop-floor fit", "Engineering & QA roles", "Multi-location hiring"],
  },
  hospitality: {
    overview:
      "Guest experience is built by people who show up with warmth, pace, and consistency—especially in high-season cycles.",
    hiringLandscape:
      "Hotels and F&B brands hire across kitchen, service, front office, housekeeping, and duty management with rapid onboarding needs.",
    howWeHelp:
      "We assess service mindset, language comfort, and prior property types so shortlists feel guest-ready from day one.",
    highlights: ["F&B & front office", "Seasonal ramp-ups", "Brand-standard briefing"],
  },
  it: {
    overview:
      "Technology hiring moves fast; we help you balance stack depth, delivery maturity, and team collaboration style.",
    hiringLandscape:
      "Software, infrastructure, QA, support, and project roles—from implementation partners to product engineering squads.",
    howWeHelp:
      "Structured technical conversations, practical assessments where needed, and clear communication on notice periods and remote/hybrid fit.",
    highlights: ["Engineering & support", "Delivery-focused screening", "Offer & joining coordination"],
  },
  "gems-jewellery": {
    overview:
      "Design sensibility, craftsmanship, and trust matter as much as sales numbers in jewellery and luxury retail.",
    hiringLandscape:
      "Designers, karigars, merchandisers, retail specialists, and quality teams across manufacturing and showroom networks.",
    howWeHelp:
      "We respect confidentiality on design-led mandates and verify portfolio, counter experience, and integrity for high-value inventory roles.",
    highlights: ["Design & production", "Retail specialists", "Discreet mandates"],
  },
  textiles: {
    overview:
      "Textile hiring ties merchandising timelines to factory discipline—we connect both sides of the supply chain.",
    hiringLandscape:
      "Production, merchandising, quality, dyeing/finishing, and supply-chain roles across apparel and fabric operations.",
    howWeHelp:
      "We align candidates with your product categories, export compliance needs, and plant shift realities.",
    highlights: ["Merch & production", "Quality & compliance", "Export-oriented teams"],
  },
  "banking-insurance": {
    overview:
      "Financial services require clarity, compliance awareness, and customer communication that protects your brand.",
    hiringLandscape:
      "Sales, operations, underwriting support, collections, and service roles across branches and centralized teams.",
    howWeHelp:
      "Background-sensitive screening, role-appropriate assessments, and interview scheduling that respects branch calendars.",
    highlights: ["Sales & operations", "Compliance-minded screening", "Branch & hub hiring"],
  },
  edtech: {
    overview:
      "EdTech teams blend pedagogy, product, and growth—we hire people who can learn your learner journey quickly.",
    hiringLandscape:
      "Instructional roles, content, customer success, inside sales, and engineering for platforms serving students and institutions.",
    howWeHelp:
      "We evaluate communication clarity, learner empathy, and comfort with metrics-driven iteration.",
    highlights: ["Content & delivery", "Growth & success", "Product & tech"],
  },
  "digital-marketing": {
    overview:
      "Modern marketing teams need creators and analysts who can tie campaigns to outcomes—not vanity metrics alone.",
    hiringLandscape:
      "SEO, performance, social, content, CRM, and marketing operations across agencies and in-house brands.",
    howWeHelp:
      "Portfolio and case-study review, channel-depth checks, and alignment on tools, budgets, and reporting cadence.",
    highlights: ["Performance & content", "Agency & in-house", "Tool-stack fit"],
  },
  fmcg: {
    overview:
      "FMCG hiring is field-heavy and pace-driven—we support territory builds and HQ functions with equal rigor.",
    hiringLandscape:
      "Sales, ASM/BM pipelines, supply chain, brand, and quality roles across modern trade and general trade.",
    howWeHelp:
      "Territory mapping, beat-plan familiarity, and stability checks for high-churn field roles—plus structured HQ shortlists.",
    highlights: ["Field force scale", "Brand & supply chain", "Rapid territory fills"],
  },
};

export function getIndustryProfile(slug: string): IndustryProfile {
  return (
    industryProfiles[slug] ?? {
      overview: "Sector-focused recruitment with ethical, confidential practices.",
      hiringLandscape: "Roles aligned to your operating model and growth stage.",
      howWeHelp: "Human-led screening, interview coordination, and onboarding support.",
      highlights: ["Confidential search", "Interview coordination", "Offer support"],
    }
  );
}

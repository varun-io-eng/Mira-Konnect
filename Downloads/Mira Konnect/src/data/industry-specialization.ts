export type IndustryExpertiseBlock = {
  label: string;
  body: string;
};

export type IndustrySpecializationContent = {
  intro: string;
  expertiseLead: string;
  expertiseAreas: IndustryExpertiseBlock[];
  depthLead: string;
  depthAreas: IndustryExpertiseBlock[];
  closingParagraphs: [string, string];
};

const specializationBySlug: Record<string, IndustrySpecializationContent> = {
  "pharmaceuticals-lifesciences": {
    intro:
      "Mira Konnect partners with pharmaceutical, biotech, and lifescience organisations that must hire under strict quality and compliance expectations—without slowing growth.",
    expertiseLead: "Our recruitment expertise spans key areas of the lifescience value chain:",
    expertiseAreas: [
      {
        label: "Field & commercial:",
        body:
          "Medical representatives, area managers, and key-account roles with ethical promotion standards and therapy-area depth.",
      },
      {
        label: "Manufacturing & quality:",
        body:
          "Production, QA/QC, validation, and plant leadership profiles accustomed to GxP environments and audit readiness.",
      },
      {
        label: "Regulatory & operations:",
        body:
          "Regulatory affairs, pharmacovigilance, supply chain, and operations talent aligned to documentation discipline.",
      },
    ],
    depthLead: "We also support specialised and leadership hiring:",
    depthAreas: [
      {
        label: "R&D & technical affairs:",
        body:
          "Scientists, formulation specialists, and tech-transfer leaders for innovation and scale-up programmes.",
      },
      {
        label: "Leadership & confidential search:",
        body:
          "Discreet mandates for critical replacements and regional heads where market sensitivity matters.",
      },
    ],
    closingParagraphs: [
      "We invest time understanding your therapy focus, territory plans, and quality culture before presenting candidates.",
      "Whether you are scaling a field force or strengthening plant leadership, Mira Konnect delivers shortlists you can defend in front of regulators and boards.",
    ],
  },
  "manufacturing-engineering": {
    intro:
      "Industrial hiring succeeds when supervisors understand safety, throughput, and shop-floor realities. We recruit for manufacturing and engineering teams across India’s production landscape.",
    expertiseLead: "Our recruitment expertise spans core manufacturing functions:",
    expertiseAreas: [
      {
        label: "Production & operations:",
        body:
          "Line leaders, shift supervisors, and operations managers who balance output, safety, and team morale.",
      },
      {
        label: "Engineering & maintenance:",
        body:
          "Mechanical, electrical, and maintenance engineers plus TPM-focused technicians for uptime-critical plants.",
      },
      {
        label: "Quality & continuous improvement:",
        body:
          "QA engineers, inspectors, and CI professionals familiar with ISO frameworks and root-cause discipline.",
      },
    ],
    depthLead: "Extended support for complex industrial mandates:",
    depthAreas: [
      {
        label: "Capital projects & automation:",
        body:
          "Project engineers and automation specialists for new lines, robotics, and digital manufacturing initiatives.",
      },
      {
        label: "Plant leadership:",
        body:
          "Plant heads and functional directors who align unions, contractors, and corporate KPIs.",
      },
    ],
    closingParagraphs: [
      "We map technical skills to your equipment, shifts, and safety protocols—not generic job titles.",
      "From single-site hires to multi-location ramp-ups, Mira Konnect keeps hiring predictable for operations leaders.",
    ],
  },
  hospitality: {
    intro:
      "Guest experience is built by people who deliver warmth, pace, and consistency. We help hotels, restaurants, and F&B groups hire for peak seasons and long-term brand standards.",
    expertiseLead: "Our hospitality recruitment covers front and back of house:",
    expertiseAreas: [
      {
        label: "Culinary & kitchen:",
        body:
          "Chefs, sous chefs, and kitchen brigades aligned to cuisine type, volume, and hygiene ratings.",
      },
      {
        label: "Service & front office:",
        body:
          "F&B attendants, hosts, reception, and guest-relations staff with strong communication and grooming.",
      },
      {
        label: "Operations & housekeeping:",
        body:
          "Housekeeping leaders, duty managers, and operations coordinators who keep properties running smoothly.",
      },
    ],
    depthLead: "Leadership and pre-opening support:",
    depthAreas: [
      {
        label: "Pre-opening teams:",
        body:
          "Rapid hiring for new properties, menu launches, and rebrands with structured onboarding timelines.",
      },
      {
        label: "Hotel management:",
        body:
          "GMs, department heads, and cluster leaders with P&L awareness and brand-standard experience.",
      },
    ],
    closingParagraphs: [
      "We assess service mindset, language comfort, and property-type fit before you interview.",
      "Partner with Mira Konnect to keep guest-facing teams staffed—without compromising brand reputation.",
    ],
  },
  it: {
    intro:
      "Technology teams need stack depth, delivery maturity, and collaboration habits that match your roadmap. We recruit across software, infrastructure, and support.",
    expertiseLead: "Our IT recruitment expertise includes:",
    expertiseAreas: [
      {
        label: "Software engineering:",
        body:
          "Full-stack, backend, mobile, and platform engineers screened for craft, ownership, and code quality.",
      },
      {
        label: "Infrastructure & security:",
        body:
          "Cloud, DevOps, network, and security roles for resilient, compliant environments.",
      },
      {
        label: "QA & delivery:",
        body:
          "QA automation, test leadership, scrum masters, and project managers who keep releases on track.",
      },
    ],
    depthLead: "Product, support, and leadership hiring:",
    depthAreas: [
      {
        label: "Product & UX:",
        body:
          "Product managers, analysts, and designers who translate user needs into shippable roadmaps.",
      },
      {
        label: "IT leadership:",
        body:
          "CTOs, engineering directors, and support heads building scalable teams and vendor partnerships.",
      },
    ],
    closingParagraphs: [
      "We combine structured technical conversations with clear communication on notice periods and hybrid expectations.",
      "Whether you are scaling a product squad or stabilising enterprise support, Mira Konnect shortlists builders who fit your culture.",
    ],
  },
  "gems-jewellery": {
    intro:
      "Jewellery and luxury retail demand design sensibility, craftsmanship, and trust. We recruit discreetly for ateliers, factories, and showroom networks.",
    expertiseLead: "Our gems & jewellery recruitment spans:",
    expertiseAreas: [
      {
        label: "Design & merchandising:",
        body:
          "Designers, CAD specialists, and merchandisers who understand collections, trends, and margin goals.",
      },
      {
        label: "Production & quality:",
        body:
          "Karigars, casting/finishing teams, and QC staff for precious-metal and stone-set manufacturing.",
      },
      {
        label: "Retail & client experience:",
        body:
          "Showroom specialists and store leaders skilled in high-value client consultation and inventory control.",
      },
    ],
    depthLead: "Confidential and leadership mandates:",
    depthAreas: [
      {
        label: "Export & B2B:",
        body:
          "Roles supporting international buyers, trade fairs, and compliance-heavy export documentation.",
      },
      {
        label: "Brand leadership:",
        body:
          "Creative directors and retail heads who protect design IP and counter performance.",
      },
    ],
    closingParagraphs: [
      "We verify portfolios, counter experience, and integrity for roles touching high-value inventory.",
      "Mira Konnect is a trusted partner when discretion and aesthetic judgment matter as much as the CV.",
    ],
  },
  textiles: {
    intro:
      "Textile and apparel hiring connects factory discipline with merchandising timelines. We support mills, garment units, and export houses across India.",
    expertiseLead: "Our textiles recruitment expertise includes:",
    expertiseAreas: [
      {
        label: "Production & processing:",
        body:
          "Cutting, sewing, dyeing, finishing, and plant supervisors accustomed to order-driven floors.",
      },
      {
        label: "Merchandising & sourcing:",
        body:
          "Merchandisers and buyers who manage buyer timelines, costing, and vendor coordination.",
      },
      {
        label: "Quality & compliance:",
        body:
          "QA teams familiar with buyer audits, AQL standards, and social-compliance programmes.",
      },
    ],
    depthLead: "Supply chain and leadership:",
    depthAreas: [
      {
        label: "Supply chain & planning:",
        body:
          "Planners and logistics coordinators linking mills, garmenting, and export schedules.",
      },
      {
        label: "Unit & operations leadership:",
        body:
          "Factory managers and operations heads balancing productivity, compliance, and labour relations.",
      },
    ],
    closingParagraphs: [
      "We align candidates with your product categories, export markets, and shift structures.",
      "From seasonal spikes to leadership succession, Mira Konnect keeps textile hiring on rhythm with your buyers.",
    ],
  },
  "banking-insurance": {
    intro:
      "Financial services hiring requires compliance awareness, customer communication, and stability. We support banks, NBFCs, insurers, and fintech partners.",
    expertiseLead: "Our banking & insurance recruitment covers:",
    expertiseAreas: [
      {
        label: "Sales & distribution:",
        body:
          "Relationship managers, bancassurance, and agency leaders meeting targets with ethical conduct.",
      },
      {
        label: "Operations & service:",
        body:
          "Branch operations, customer service, and back-office teams handling high-volume, regulated work.",
      },
      {
        label: "Risk & compliance:",
        body:
          "Underwriting support, collections, KYC/AML, and compliance officers protecting institutional trust.",
      },
    ],
    depthLead: "Specialist and leadership roles:",
    depthAreas: [
      {
        label: "Product & actuarial support:",
        body:
          "Product analysts and actuarial assistants for life, health, and general insurance lines.",
      },
      {
        label: "Regional leadership:",
        body:
          "Cluster heads and zonal managers aligning branch networks with growth and audit priorities.",
      },
    ],
    closingParagraphs: [
      "We conduct background-sensitive screening and schedule interviews around branch calendars.",
      "Mira Konnect helps you hire professionals who represent your brand responsibly in every customer conversation.",
    ],
  },
  edtech: {
    intro:
      "EdTech organisations blend pedagogy, product, and growth. We hire people who understand learners, content, and measurable outcomes.",
    expertiseLead: "Our EdTech recruitment expertise spans:",
    expertiseAreas: [
      {
        label: "Instruction & content:",
        body:
          "Educators, instructional designers, and content leads who make complex topics accessible.",
      },
      {
        label: "Growth & success:",
        body:
          "Inside sales, customer success, and community managers driving retention and NPS.",
      },
      {
        label: "Technology & product:",
        body:
          "Engineers and product managers building scalable learning platforms and analytics.",
      },
    ],
    depthLead: "Leadership and partnerships:",
    depthAreas: [
      {
        label: "Institutional partnerships:",
        body:
          "BD and account roles for schools, universities, and corporate L&D programmes.",
      },
      {
        label: "Functional leadership:",
        body:
          "Heads of content, product, and revenue teams scaling omnichannel learning businesses.",
      },
    ],
    closingParagraphs: [
      "We evaluate communication clarity, learner empathy, and comfort with data-informed iteration.",
      "Partner with Mira Konnect to grow teams that improve lives—not just dashboard metrics.",
    ],
  },
  "digital-marketing": {
    intro:
      "Modern marketing needs creators and analysts who connect campaigns to revenue. We recruit for agencies and in-house brands across digital channels.",
    expertiseLead: "Our digital marketing recruitment includes:",
    expertiseAreas: [
      {
        label: "Performance & growth:",
        body:
          "Paid media, SEO, and growth marketers optimising CAC, ROAS, and funnel conversion.",
      },
      {
        label: "Content & social:",
        body:
          "Writers, strategists, and social leads building consistent brand voice and engagement.",
      },
      {
        label: "Marketing operations:",
        body:
          "CRM, automation, and analytics specialists tying tools to reporting cadence.",
      },
    ],
    depthLead: "Creative and leadership hiring:",
    depthAreas: [
      {
        label: "Creative & brand:",
        body:
          "Designers and brand managers for integrated campaigns across digital and offline touchpoints.",
      },
      {
        label: "Agency & client leadership:",
        body:
          "Account directors and marketing heads managing teams, budgets, and client expectations.",
      },
    ],
    closingParagraphs: [
      "We review portfolios and case studies, not buzzwords—aligning channel depth with your stack and budgets.",
      "Mira Konnect helps you build marketing teams that learn fast and report honestly.",
    ],
  },
  fmcg: {
    intro:
      "FMCG hiring is field-heavy and pace-driven. We support modern trade, general trade, and HQ teams for brands scaling across India.",
    expertiseLead: "Our FMCG recruitment expertise covers:",
    expertiseAreas: [
      {
        label: "Sales & distribution:",
        body:
          "ASMs, sales officers, and trade marketing staff who know beats, outlets, and distributor networks.",
      },
      {
        label: "Supply chain & planning:",
        body:
          "Demand planners, warehouse leaders, and logistics coordinators for high-velocity SKUs.",
      },
      {
        label: "Brand & category:",
        body:
          "Brand managers and category leads translating insights into shelf and campaign execution.",
      },
    ],
    depthLead: "Quality and plant roles:",
    depthAreas: [
      {
        label: "Manufacturing & quality:",
        body:
          "Plant QA and production supervisors maintaining consistency at scale.",
      },
      {
        label: "Regional leadership:",
        body:
          "RMs and sales directors building territory depth and retailer partnerships.",
      },
    ],
    closingParagraphs: [
      "We map territory familiarity and stability for high-churn field roles while running structured HQ searches.",
      "Mira Konnect is your partner when every week counts toward market share and shelf presence.",
    ],
  },
};

export function getIndustrySpecialization(slug: string): IndustrySpecializationContent {
  return (
    specializationBySlug[slug] ?? {
      intro:
        "Mira Konnect provides sector-focused recruitment with ethical, confidential practices tailored to your operating model.",
      expertiseLead: "Our recruitment expertise includes:",
      expertiseAreas: [
        {
          label: "Core hiring:",
          body: "Role-aligned screening and shortlists built around your success criteria.",
        },
        {
          label: "Operations support:",
          body: "Interview coordination, feedback loops, and offer management.",
        },
        {
          label: "Leadership search:",
          body: "Confidential mandates for critical and senior replacements.",
        },
      ],
      depthLead: "Partnership approach:",
      depthAreas: [
        {
          label: "Discovery:",
          body: "We capture culture, reporting lines, and timelines before sourcing begins.",
        },
        {
          label: "Delivery:",
          body: "Human-led judgment supported by scheduling and pipeline visibility.",
        },
      ],
      closingParagraphs: [
        "We treat every mandate as a partnership—not a transaction.",
        "Contact Mira Konnect to discuss hiring in this sector.",
      ],
    }
  );
}

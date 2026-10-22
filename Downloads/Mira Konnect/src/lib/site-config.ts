export const siteConfig = {
  name: "Mira Konnect",
  tagline: "Connecting the Right Talent with the Right Opportunity",
  description:
    "Mira Konnect is a professional HR, recruitment, and staffing partner helping employers hire with confidence and helping candidates discover meaningful career opportunities across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "info@mirakonnect.com",
    phone: "8511812879",
    address: "Vihav Parvarish, Room B-801, Vasna Canal road, Vadodara, Gujarat 391101",
    addressLines: [
      "Vihav Parvarish, Room Number B-801",
      "Vasna Canal road, Vadodara",
      "Gujarat — 391101",
    ],
  },
} as const;

/** Primary pill navigation (TekPillar-style IA) */
export const pillNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const navLinks = [
  ...pillNavLinks,
  { href: "/for-employers", label: "For Employers" },
  { href: "/for-job-seekers", label: "For Job Seekers" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/faq", label: "FAQ" },
] as const;

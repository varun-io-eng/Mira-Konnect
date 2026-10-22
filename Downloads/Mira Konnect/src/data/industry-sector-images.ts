/**
 * Industry imagery — HD photos in public/images/industries/hd/
 * Refresh: npm run images:industries-hd
 */

const hd = "/images/industries/hd";
const home = "/images/industries/home";

const industrySlugs = [
  "pharmaceuticals-lifesciences",
  "manufacturing-engineering",
  "hospitality",
  "it",
  "gems-jewellery",
  "textiles",
  "banking-insurance",
  "edtech",
  "digital-marketing",
  "fmcg",
] as const;

function dualForSlug(slug: string) {
  return {
    a: `${hd}/${slug}-a.jpg`,
    b: `${hd}/${slug}-b.jpg`,
  };
}

/** Two photos per sector on /industries detail panels */
export const industrySectorDualImages: Record<string, { a: string; b: string }> =
  Object.fromEntries(industrySlugs.map((slug) => [slug, dualForSlug(slug)]));

/** Home sector cards — HD hero still (synced from hd *-a on fetch) */
const homeCardBySlug: Record<string, string> = Object.fromEntries(
  industrySlugs.map((slug) => [slug, `${home}/${slug}.jpg`]),
);

export function getIndustrySectorDualImages(slug: string) {
  return industrySectorDualImages[slug];
}

export function getIndustryHomeCardImage(slug: string) {
  return homeCardBySlug[slug];
}

import { blogResources, type BlogResource } from "@/data/blog-resources";

export type BlogSectionId = "career-advancement" | "employer-guide" | "expert-insights";

export const featuredBlogSlug = "ai-recruitment";

export const blogResourceSections: {
  id: BlogSectionId;
  title: string;
  slugs: string[];
}[] = [
  {
    id: "career-advancement",
    title: "Career Advancement",
    slugs: ["resume-recruiter-attention", "job-interview-tips", "online-job-interview"],
  },
  {
    id: "employer-guide",
    title: "Employer Guide",
    slugs: [
      "inhouse-vs-consultancy",
      "hire-it-professionals",
      "manufacturing-recruitment-challenges",
      "complete-recruitment-process",
    ],
  },
  {
    id: "expert-insights",
    title: "Expert Insights",
    slugs: ["skills-based-hiring", "candidate-experience"],
  },
];

const bySlug = new Map(blogResources.map((r) => [r.slug, r]));

export function getBlogResource(slug: string): BlogResource | undefined {
  return bySlug.get(slug);
}

export function getFeaturedBlogResource(): BlogResource {
  return bySlug.get(featuredBlogSlug) ?? blogResources[0];
}

export function getSectionResources(section: (typeof blogResourceSections)[number]): BlogResource[] {
  return section.slugs.map((s) => bySlug.get(s)).filter((r): r is BlogResource => Boolean(r));
}

export function getSectionLabel(sectionId: BlogSectionId): string {
  return blogResourceSections.find((s) => s.id === sectionId)?.title ?? sectionId;
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Mira Konnect recruitment services.",
};

const fallbackFaqs = [
  {
    question: "How does Mira Konnect handle confidentiality?",
    answer:
      "We treat client and candidate information with strict professionalism and share details only with authorized parties involved in the hiring process.",
  },
  {
    question: "Do you charge job seekers?",
    answer:
      "Our candidate support model will be communicated clearly during engagement. Contact our HR team for current policy.",
  },
  {
    question: "Which industries do you cover?",
    answer:
      "We work across pharmaceuticals, manufacturing, hospitality, IT, gems and jewellery, textiles, banking and insurance, EdTech, digital marketing, and FMCG.",
  },
];

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
  const items = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <>
      <PageHeader
        title="FAQ"
        description="Common questions about working with Mira Konnect."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <dl className="space-y-8">
          {items.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-mk-navy">{item.question}</dt>
              <dd className="mt-2 text-sm text-mk-slate leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

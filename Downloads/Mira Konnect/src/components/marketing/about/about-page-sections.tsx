import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutCandidateFreeBanner } from "@/components/marketing/about/about-candidate-free-banner";
import { AboutStorySection } from "@/components/marketing/about/about-story-section";
import { AboutDualHiringCta } from "@/components/marketing/about/about-dual-hiring-cta";
import { AboutPromiseStrip } from "@/components/marketing/about/about-promise-strip";
import { Button } from "@/components/ui/button";
import { aboutStoryImages } from "@/data/about-story";
import { siteConfig } from "@/lib/site-config";

export function AboutPageContent() {
  return (
    <>
      <AboutStorySection
        className="bg-white"
        imageSide="right"
        imageSrc={aboutStoryImages.careerPath.src}
        imageAlt={aboutStoryImages.careerPath.alt}
        eyebrow="Welcome"
        title={`Welcome to ${siteConfig.name}`}
      >
        <p>
          Every career is a path—not a lottery ticket. We help candidates see the next step clearly
          and help employers build teams that last beyond the offer letter.
        </p>
        <p>
          {siteConfig.name} is a recruitment partner built for real conversations: structured
          screening, honest feedback, and respect for confidentiality on both sides.
        </p>
        <Button href="/how-we-work" variant="outline" className="mt-4 gap-2">
          See our process
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </AboutStorySection>

      <AboutCandidateFreeBanner />

      <AboutStorySection
        className="border-t border-mk-navy/5 bg-mk-sand/20"
        imageSide="right"
        imageSrc={aboutStoryImages.teamCollaboration.src}
        imageAlt={aboutStoryImages.teamCollaboration.alt}
        eyebrow="People first"
        title="Recruiters who work beside you"
      >
        <p>
          Hiring managers stay in the loop with shortlists that make sense—role fit, motivation,
          and culture—not just keyword matches on a CV.
        </p>
        <p>
          Our team coordinates interviews, gathers feedback, and keeps momentum so strong candidates
          do not slip away while process drags.
        </p>
      </AboutStorySection>

      <AboutPromiseStrip />

      <AboutStorySection
        className="bg-white"
        imageSide="left"
        imageSrc={aboutStoryImages.digitalNetwork.src}
        imageAlt={aboutStoryImages.digitalNetwork.alt}
        eyebrow="Connected hiring"
        title="Technology with a human centre"
      >
        <p>
          Profiles, pipelines, and scheduling tools support our recruiters—they do not replace the
          judgment that comes from years in your industry.
        </p>
        <p>
          Candidates track applications and interviews; employers get visibility without exposing
          sensitive data. Everything is designed around trust.
        </p>
        <Link
          href="/for-employers"
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-mk-teal hover:text-mk-navy"
        >
          Solutions for employers
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </AboutStorySection>

      <AboutStorySection
        className="border-t border-mk-navy/5 bg-mk-sand/15"
        imageSide="right"
        imageSrc={aboutStoryImages.inclusiveMobility.src}
        imageAlt={aboutStoryImages.inclusiveMobility.alt}
        eyebrow="Fairness & access"
        title="Opportunity without barriers"
      >
        <p>
          We shortlist on capability and conduct. Mandates are handled ethically, and we actively
          support inclusive hiring practices that widen access to meaningful work.
        </p>
        <p>
          From interview coaching to community mentoring, we invest in people—not only placements.
        </p>
        <Link
          href="/faq"
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-mk-teal hover:text-mk-navy"
        >
          Read common questions
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </AboutStorySection>

      <AboutDualHiringCta />
    </>
  );
}

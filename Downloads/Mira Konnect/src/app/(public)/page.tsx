import { HomeHeroTekStyle } from "@/components/marketing/home-hero-tek-style";
import { HomeCandidateTestimonials } from "@/components/marketing/home-candidate-testimonials";
import { HomeProcessVideo } from "@/components/marketing/home-process-video";

import { HomeWelcomeSplit } from "@/components/marketing/home-welcome-split";

import { HomeEmployerHiring } from "@/components/marketing/home-employer-hiring";

import { HomeWhySection } from "@/components/marketing/home-why-section";

import { HomeIndustriesSection } from "@/components/marketing/home-industries-section";

import { HomeInsightsSection } from "@/components/marketing/home-insights-section";
import { HomeFinalCta } from "@/components/marketing/home-final-cta";



export default function HomePage() {

  return (

    <div className="overflow-x-hidden">

      <HomeHeroTekStyle />

      <HomeProcessVideo />

      <HomeCandidateTestimonials />

      <HomeWelcomeSplit />

      <HomeEmployerHiring />

      <HomeWhySection />

      <HomeIndustriesSection />

      <HomeInsightsSection />

      <HomeFinalCta />

    </div>

  );

}



import type { Metadata } from "next";

import { PageHeader } from "@/components/marketing/page-header";

import { ServicesJourneySteps } from "@/components/marketing/services-journey-steps";

import { Button } from "@/components/ui/button";

import { servicesJourneys } from "@/data/services-journey-steps";



export const metadata: Metadata = {

  title: "Services",

  description:

    "Recruitment and career support for employers and job seekers—one clear process, step by step, with Mira Konnect.",

};



const [employerJourney, candidateJourney] = servicesJourneys;



export default function ServicesPage() {

  return (

    <>

      <PageHeader

        title="Services"

        description="One place for how we work with hiring teams and with job seekers—structured steps, clear communication, no candidate fees."

      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <ServicesJourneySteps journey={employerJourney} />

        <div className="mt-10 flex justify-center">

          <Button href="/for-employers" size="lg">Hire talent</Button>

        </div>



        <ServicesJourneySteps journey={candidateJourney} className="mt-24 border-t border-mk-navy/8 pt-20" />

        <div className="mt-10 flex justify-center">

          <Button href="/jobs" variant="secondary" size="lg">Find jobs</Button>

        </div>

      </div>

    </>

  );

}



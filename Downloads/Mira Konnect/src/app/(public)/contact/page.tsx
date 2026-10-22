import type { Metadata } from "next";

import { ContactInfoSidebar } from "@/components/marketing/contact-info-sidebar";

import { PageHeader } from "@/components/marketing/page-header";

import { ContactForm } from "@/components/forms/contact-form";



export const metadata: Metadata = {

  title: "Contact",

  description: "Talk to the Mira Konnect HR team.",

};



export default function ContactPage() {

  return (

    <>

      <PageHeader
        title="Contact"

        description="Talk to Our HR Team — we respond to employer and candidate enquiries professionally and confidentially."

      />

      <div className="bg-[#eef1f4]">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:gap-10 lg:px-8 lg:py-16">

          <ContactInfoSidebar />

          <div className="min-w-0 flex-1 border border-mk-navy/10 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="font-display text-xl font-semibold text-mk-navy">Send us a message</h2>

            <p className="mt-2 text-sm text-mk-muted">

              Fill in your details and we will get back to you shortly.

            </p>

            <div className="mt-6">

              <ContactForm />

            </div>

          </div>

        </div>

      </div>

    </>

  );

}



"use client";



import Image from "next/image";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import type { IndustryItem } from "@/data/industries";

import { getIndustryHomeCardImage } from "@/data/industry-sector-images";

import { cn } from "@/lib/utils";



export function HomeIndustryCard({ industry }: { industry: IndustryItem }) {

  const imageSrc = getIndustryHomeCardImage(industry.slug);

  const href = `/industries?sector=${industry.slug}`;



  return (

    <Link

      href={href}

      className="group relative block w-full overflow-hidden rounded-xl bg-mk-sand/30 shadow-md ring-1 ring-mk-navy/[0.06] transition duration-300 hover:shadow-xl hover:ring-mk-teal/20 aspect-[16/10] min-h-[220px] sm:min-h-[280px] lg:min-h-[300px]"

    >

      <Image

        src={imageSrc}

        alt={industry.name}

        fill

        className="object-cover transition duration-500 group-hover:scale-[1.03]"

        sizes="(max-width: 640px) 100vw, 50vw"

        quality={95}

        unoptimized

      />

      <div

        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"

        aria-hidden

      />



      <div

        className={cn(

          "absolute inset-x-0 bottom-0 max-h-[46%] bg-[#f2f2f2]/97 backdrop-blur-[2px]",

          "transition-all duration-300 ease-out",

          "px-4 pb-3 pt-3 sm:px-5 sm:pb-4 sm:pt-3.5",

        )}

      >

        <div className="flex items-start justify-between gap-3">

          <h3 className="font-display text-base font-semibold leading-snug text-mk-navy sm:text-lg lg:text-xl">

            {industry.name}

          </h3>

          <span

            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e4d7b] text-white shadow-md transition group-hover:bg-mk-teal sm:h-11 sm:w-11"

            aria-hidden

          >

            <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />

          </span>

        </div>



        <p

          className={cn(

            "line-clamp-2 overflow-hidden text-xs leading-relaxed text-mk-slate sm:text-sm sm:line-clamp-3",

            "max-h-0 opacity-0 transition-all duration-300 ease-out",

            "group-hover:mt-2 group-hover:max-h-[3.25rem] group-hover:opacity-100 sm:group-hover:max-h-[4.5rem]",

            "group-focus-visible:mt-2 group-focus-visible:max-h-[3.25rem] group-focus-visible:opacity-100 sm:group-focus-visible:max-h-[4.5rem]",

          )}

        >

          {industry.description}

        </p>



        <span className="sr-only">Explore {industry.name}</span>

      </div>

    </Link>

  );

}



export type ServicesJourneyStep = {

  title: string;

  description: string;

};



export type ServicesJourney = {

  id: "employers" | "candidates";

  eyebrow: string;

  headline: string;

  intro: string;

  steps: ServicesJourneyStep[];

};



export const servicesJourneys: ServicesJourney[] = [

  {

    id: "employers",

    eyebrow: "For employers",

    headline: "How we hire with you—step by step",

    intro:

      "End-to-end recruitment support from sourcing through onboarding. Each step below is part of how Mira Konnect moves your role from brief to joined candidate.",

    steps: [

      {

        title: "Talent Sourcing",

        description:

          "Targeted search and outreach aligned with your role, culture, and hiring timeline.",

      },

      {

        title: "Candidate Screening",

        description:

          "Structured evaluation against skills, experience, and fit before profiles reach your desk.",

      },

      {

        title: "Candidate Shortlisting",

        description:

          "Curated profiles ready for your review—clear summaries and relevance to the brief.",

      },

      {

        title: "Candidate Evaluation",

        description:

          "Assessment support tailored to the role level, including technical or functional checks where needed.",

      },

      {

        title: "Interview Scheduling",

        description:

          "Calendar coordination between your team and candidates so rounds stay on track.",

      },

      {

        title: "Interview Coordination",

        description:

          "End-to-end logistics for online, phone, and in-person interviews plus follow-up.",

      },

      {

        title: "Offer / Salary Negotiation Support",

        description:

          "Professional guidance through offer discussions so both sides reach a fair agreement.",

      },

      {

        title: "Background Verification",

        description:

          "Coordination of checks as per your policy before the candidate joins.",

      },

      {

        title: "Final Onboarding Support",

        description:

          "Support through joining and early transition so your new hire starts confidently.",

      },

    ],

  },

  {

    id: "candidates",

    eyebrow: "For job seekers",

    headline: "How you get hired with us—step by step",

    intro:

      "No fees for job seekers. Follow the path below from matching to interviews—Mira Konnect supports you at every stage.",

    steps: [

      {

        title: "Job Matching",

        description:

          "Relevant opportunities aligned with your profile, experience, and career goals.",

      },

      {

        title: "Resume Guidance",

        description:

          "Practical feedback to present your experience clearly for the roles you target.",

      },

      {

        title: "Interview Preparation",

        description:

          "Structured prep for technical and HR conversations with role-specific context.",

      },

      {

        title: "Career Guidance",

        description:

          "Support for next-step decisions—role fit, growth, and how each opportunity fits your path.",

      },

      {

        title: "Interview Tips",

        description:

          "Actionable advice for common interview scenarios so you show up prepared and confident.",

      },

      {

        title: "Resume-Writing Assistance",

        description:

          "Help articulating achievements and role fit so employers see your strengths quickly.",

      },

    ],

  },

];



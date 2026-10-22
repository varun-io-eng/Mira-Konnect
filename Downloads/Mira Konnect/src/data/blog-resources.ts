export type BlogResource = {

  slug: string;

  number: number;

  title: string;

  audience: string;

  whatToCover: string;

  referenceLabel: string;

  /** Verified HTTP 200 — see scripts/check-blog-reference-urls.mjs */

  referenceUrl: string;

  videoLabel: string;

  /** Embeddable YouTube ID — see scripts/check-blog-youtube-videos.mjs */

  youtubeVideoId: string;

  imageSrc: string;

  imageAlt: string;

};



const thumb = (file: string) => `/images/blog/${file}`;



export const blogResources: BlogResource[] = [

  {

    slug: "complete-recruitment-process",

    number: 1,

    title: "The Complete Recruitment Process: From Job Requirements to Onboarding",

    audience: "For employers — Hiring & HR",

    whatToCover:

      "Job requirements, job marketing, sourcing, screening, interview, selection, background verification, and onboarding.",

    referenceLabel: "SHRM — The Complete Guide to Effective Recruiting Practices",

    referenceUrl:

      "https://www.shrm.org/topics-tools/workplace/complete-guide-to-effective-recruiting",

    videoLabel:

      "Understanding recruitment flow: from application to selection",

    youtubeVideoId: "oQn0EfXbvZ8",

    imageSrc: thumb("01-recruitment-process.jpg"),

    imageAlt: "Corporate professionals in a recruitment planning session",

  },

  {

    slug: "resume-recruiter-attention",

    number: 2,

    title: "How to Write a Resume That Gets Recruiters’ Attention",

    audience: "For candidates — Resume guidance",

    whatToCover:

      "Resume structure, relevant keywords, achievements, skills, formatting, and common mistakes.",

    referenceLabel: "Indeed — Best resume skills (with examples)",

    referenceUrl:

      "https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-skills",

    videoLabel:

      "Indeed — Resume writing: 4 tips on how to write a standout resume",

    youtubeVideoId: "aD7fP-2u3iY",

    imageSrc: thumb("02-resume-writing.jpg"),

    imageAlt: "Candidate reviewing a resume on a laptop",

  },

  {

    slug: "job-interview-tips",

    number: 3,

    title: "Top Job Interview Tips: How to Prepare and Answer Confidently",

    audience: "For candidates — Interview preparation",

    whatToCover:

      "Researching employers, practicing answers, body language, the STAR method, and post-interview follow-up.",

    referenceLabel: "SHRM — Recruitment & selection process (interview stage)",

    referenceUrl:

      "https://www.shrm.org/topics-tools/tools/policies/recruitment-selection-process",

    videoLabel: "Indeed — Top interview tips: common questions & communication",

    youtubeVideoId: "HG68Ymazo18",

    imageSrc: thumb("03-interview-tips.jpg"),

    imageAlt: "One-to-one job interview in a modern office",

  },

  {

    slug: "skills-based-hiring",

    number: 4,

    title: "Skills-Based Hiring: Why Skills Matter More Than Job Titles",

    audience: "For employers — Recruitment strategy",

    whatToCover:

      "Defining role-specific skills, practical assessments, behavioral interview, and evaluating candidates fairly.",

    referenceLabel: "LinkedIn — Talent strategy insights (skills-based hiring)",

    referenceUrl: "https://www.linkedin.com/business/talent/blog/talent-strategy",

    videoLabel: "LinkedIn — Breaking the paper ceiling: skills-based hiring",

    youtubeVideoId: "ca8h-1SMOjs",

    imageSrc: thumb("04-skills-based-hiring.jpg"),

    imageAlt: "HR team reviewing skills and competencies",

  },

  {

    slug: "online-job-interview",

    number: 5,

    title: "How to Ace an Online Job Interview",

    audience: "For candidates — Virtual interviews",

    whatToCover:

      "Camera and audio checks, lighting, professional background, preparation, and clear communication.",

    referenceLabel: "SHRM — Effective recruiting (virtual hiring & interview tools)",

    referenceUrl:

      "https://www.shrm.org/topics-tools/workplace/complete-guide-to-effective-recruiting",

    videoLabel: "Indeed — Top tips to ace video interviews",

    youtubeVideoId: "xNGrePi32ho",

    imageSrc: thumb("05-online-interview.jpg"),

    imageAlt: "Professional preparing for a virtual interview",

  },

  {

    slug: "inhouse-vs-consultancy",

    number: 6,

    title: "In-House Recruitment vs. Recruitment Consultancy: Which is Right for Your Business?",

    audience: "For employers — Hiring solutions",

    whatToCover:

      "Internal HR teams versus external recruitment partners, specialist hiring needs, workload, and decision criteria.",

    referenceLabel: "LinkedIn — Talent Blog (search & staffing resources)",

    referenceUrl: "https://www.linkedin.com/business/talent/blog",

    videoLabel:

      "Recruitment agency vs. in-house HR — four key differences",

    youtubeVideoId: "TJmOnCD1Oak",

    imageSrc: thumb("06-inhouse-vs-agency.jpg"),

    imageAlt: "Business leaders comparing hiring models",

  },

  {

    slug: "hire-it-professionals",

    number: 7,

    title: "How to Hire the Right IT and Technology Professionals",

    audience: "For employers — IT industry",

    whatToCover:

      "Defining technical requirements, evaluating portfolios, coding or skills assessments, communication, and team fit.",

    referenceLabel: "LinkedIn — Hire talent solutions for employers",

    referenceUrl: "https://business.linkedin.com/hire",

    videoLabel: "How We Hire at Google (technical & onsite interviews)",

    youtubeVideoId: "zhUgaKb0s5A",

    imageSrc: thumb("07-it-hiring.jpg"),

    imageAlt: "Software team discussing technical hiring",

  },

  {

    slug: "manufacturing-recruitment-challenges",

    number: 8,

    title: "Recruitment Challenges in Manufacturing and Engineering",

    audience: "For employers — Industry insights",

    whatToCover:

      "Technical skill gaps, safety awareness, shift requirements, hands-on assessments, and retaining skilled employees.",

    referenceLabel: "LinkedIn — Future of Recruiting report & resources",

    referenceUrl:

      "https://business.linkedin.com/hire/resources/future-of-recruiting",

    videoLabel:

      "Building your manufacturing workforce: hiring, upskilling & retention",

    youtubeVideoId: "E22ckq7XcYA",

    imageSrc: thumb("08-manufacturing-recruitment.jpg"),

    imageAlt: "Engineering and manufacturing workplace",

  },

  {

    slug: "candidate-experience",

    number: 9,

    title: "Why Candidate Experience Matters in Recruitment",

    audience: "For employers — Trust & communication",

    whatToCover:

      "Timely updates, transparent job expectations, respectful interviews, feedback, and a smooth onboarding experience.",

    referenceLabel: "SHRM — Soulful Selection (candidate experience & hiring)",

    referenceUrl:

      "https://www.shrm.org/executive-network/insights/people-strategy/soulful-selection",

    videoLabel:

      "Indeed — Smart screening & a better experience for candidates",

    youtubeVideoId: "OYnsOOzMYmE",

    imageSrc: thumb("09-candidate-experience.jpg"),

    imageAlt: "Recruiter and candidate in a positive hiring conversation",

  },

  {

    slug: "ai-recruitment",

    number: 10,

    title: "How AI is Changing Recruitment and Talent Acquisition",

    audience: "For employers — Recruitment trends",

    whatToCover:

      "AI-assisted sourcing, resume matching, repetitive-task automation, human oversight, privacy, and fair candidate evaluation.",

    referenceLabel: "LinkedIn — Future of Recruiting (2025 trends & AI)",

    referenceUrl:

      "https://business.linkedin.com/hire/resources/future-of-recruiting",

    videoLabel: "LinkedIn — How LinkedIn built an AI agent for hiring",

    youtubeVideoId: "NmblVxyBhi8",

    imageSrc: thumb("10-ai-recruitment.jpg"),

    imageAlt: "Talent team exploring AI tools for hiring",

  },

];



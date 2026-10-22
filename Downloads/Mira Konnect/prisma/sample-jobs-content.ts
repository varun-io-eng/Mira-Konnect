import { EmploymentType } from "@prisma/client";

export type SampleJobSeed = {
  title: string;
  slug: string;
  location: string;
  industrySlug: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  experienceMin: number;
  experienceMax?: number;
  salaryDisplay: string;
  employmentType: EmploymentType;
  skills: string[];
};

export const sampleJobsContent: SampleJobSeed[] = [
  {
    title: "HR Manager / Executive",
    slug: "hr-manager-executive-ahmedabad",
    location: "Ahmedabad",
    industrySlug: "pharmaceuticals-lifesciences",
    employmentType: EmploymentType.FULL_TIME,
    experienceMin: 5,
    experienceMax: 10,
    salaryDisplay: "Competitive · Pharma MNC",
    description:
      "Lead the people function for a growing pharmaceutical organisation in Ahmedabad. You will partner with plant leadership on workforce planning, compliance, and culture—while owning day-to-day HR operations across blue- and white-collar teams.",
    responsibilities:
      "Own end-to-end HR for the site including recruitment coordination, onboarding, and employee lifecycle\nDrive statutory compliance (PF, ESIC, factory-related HR norms) with accuracy and timeliness\nPartner with department heads on manpower planning, performance cycles, and engagement initiatives\nHandle employee relations, grievance resolution, and disciplinary processes with fairness and documentation\nSupport compensation benchmarking and offer structuring in line with company policy\nReport HR metrics and insights to regional leadership",
    requirements:
      "MBA / PG in HR or equivalent with 5+ years in HR generalist or HR manager roles\nExperience in pharmaceuticals, lifesciences, or regulated manufacturing strongly preferred\nSolid knowledge of Gujarat / India labour laws and HR best practices\nExcellent stakeholder communication in English and Hindi\nCalm, ethical approach to confidential employee matters",
    benefits:
      "Structured growth path with Mira Konnect and the client organisation\nHealth insurance and statutory benefits as per company policy\nProfessional, compliance-focused work environment",
    skills: ["HR Operations", "Employee Relations", "Compliance", "Pharma"],
  },
  {
    title: "Automation Engineer",
    slug: "automation-engineer-ahmedabad",
    location: "Ahmedabad",
    industrySlug: "manufacturing-engineering",
    employmentType: EmploymentType.FULL_TIME,
    experienceMin: 3,
    experienceMax: 7,
    salaryDisplay: "As per experience",
    description:
      "Design, programme, and maintain automation systems for high-volume manufacturing lines. You will work closely with maintenance and production teams to improve uptime, safety, and throughput.",
    responsibilities:
      "Programme and troubleshoot PLCs, HMIs, and motion control systems\nSupport commissioning of new equipment and line changeovers\nDocument electrical / automation drawings and SOPs for maintenance teams\nLead root-cause analysis for downtime and quality-related stoppages\nCoordinate with OEM vendors for upgrades, spares, and warranty support",
    requirements:
      "B.E. / B.Tech in Electrical, Electronics, or Instrumentation\n3+ years in industrial automation (PLC / SCADA)\nHands-on experience with Siemens, Allen Bradley, or similar platforms\nWillingness to work in plant environment with shift coordination when needed",
    benefits:
      "Exposure to modern manufacturing and automation projects\nSkill development through vendor and internal training\nStable organisation with clear safety standards",
    skills: ["PLC", "SCADA", "HMI", "Troubleshooting"],
  },
  {
    title: "Chef / F&B",
    slug: "chef-fb-ahmedabad-surat",
    location: "Ahmedabad / Surat",
    industrySlug: "hospitality",
    employmentType: EmploymentType.FULL_TIME,
    experienceMin: 2,
    experienceMax: 8,
    salaryDisplay: "Negotiable · Hospitality",
    description:
      "Kitchen and food & beverage leadership for a multi-outlet hospitality brand. You will own menu execution, kitchen hygiene, and team coaching while delivering consistent guest experiences.",
    responsibilities:
      "Plan and execute menus aligned with brand standards and local preferences\nManage kitchen brigade scheduling, training, and performance\nMaintain FSSAI and internal hygiene audits at excellent levels\nControl food cost, wastage, and inventory with the stores team\nCoordinate with service staff for smooth banquets and peak service",
    requirements:
      "Diploma / degree in culinary arts or equivalent professional training\n2+ years as Chef de Partie or higher in hotels or large restaurants\nStrong knowledge of Indian and continental cuisines\nLeadership presence and ability to work under peak pressure",
    benefits:
      "Creative input on seasonal menus\nAccommodation / meals as per company policy where applicable\nGrowth into executive chef or cluster roles",
    skills: ["Kitchen Management", "FSSAI", "Menu Planning", "Team Lead"],
  },
  {
    title: "HR Executive",
    slug: "hr-executive-mumbai",
    location: "Mumbai",
    industrySlug: "pharmaceuticals-lifesciences",
    employmentType: EmploymentType.FULL_TIME,
    experienceMin: 2,
    experienceMax: 5,
    salaryDisplay: "Open · Mumbai",
    description:
      "Support HR programs for a Mumbai-based pharma commercial team. Ideal for an organised HR executive who enjoys recruitment coordination, employee engagement, and accurate HR documentation.",
    responsibilities:
      "Coordinate interviews, offer letters, and onboarding for sales and support roles\nMaintain HRIS / employee records and leave attendance data\nAssist with engagement activities, town halls, and policy communication\nSupport payroll inputs and reimbursement processing with finance\nHelp prepare HR reports for business and compliance reviews",
    requirements:
      "Graduate with specialisation in HR preferred; 2+ years HR executive experience\nExposure to pharma or FMCG field teams is a plus\nStrong Excel skills and attention to detail\nProfessional written and spoken English",
    benefits:
      "Mentorship from senior HR leaders\nCentral Mumbai or Navi Mumbai office options (client dependent)\nClear path to HR business partner roles",
    skills: ["Recruitment Coordination", "HRIS", "Onboarding", "Excel"],
  },
  {
    title: "Sales Coordinator",
    slug: "sales-coordinator-vadodara",
    location: "Vadodara",
    industrySlug: "manufacturing-engineering",
    employmentType: EmploymentType.FULL_TIME,
    experienceMin: 1,
    experienceMax: 4,
    salaryDisplay: "Monthly CTC · Manufacturing",
    description:
      "Be the operational backbone for a manufacturing sales team in Vadodara—managing enquiries, quotations, dispatch coordination, and customer follow-ups with precision and warmth.",
    responsibilities:
      "Process customer enquiries and prepare quotation support for sales managers\nCoordinate with production and logistics for order fulfilment timelines\nMaintain CRM / tracker updates and weekly pipeline reports\nFollow up on payments and delivery confirmations professionally\nSupport sales visits with documentation and sample coordination",
    requirements:
      "Graduate in any discipline; 1–3 years in sales coordination or customer service\nComfort with MS Office and ERP / CRM tools\nClear communication in English and Gujarati\nOrganised, proactive, and customer-oriented mindset",
    benefits:
      "Learn B2B manufacturing sales operations end-to-end\nPerformance incentives linked to team targets (client policy)\nStable weekday role with occasional market visits",
    skills: ["Sales Support", "CRM", "Coordination", "Customer Service"],
  },
];

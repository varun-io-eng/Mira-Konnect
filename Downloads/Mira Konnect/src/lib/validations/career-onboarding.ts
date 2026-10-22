import { z } from "zod";

export const NOTICE_PERIOD_OPTIONS = [
  { label: "Immediate", days: 0 },
  { label: "15 days", days: 15 },
  { label: "30 days", days: 30 },
  { label: "60 days", days: 60 },
  { label: "90 days", days: 90 },
] as const;

export const JOB_FUNCTION_OPTIONS = [
  "Engineering / IT",
  "Sales & Business Development",
  "Marketing & Digital",
  "Operations & Supply Chain",
  "Human Resources",
  "Finance & Accounts",
  "Manufacturing & Production",
  "Pharma & Life Sciences",
  "Hospitality & Customer Service",
  "Other",
] as const;

const lakhs = z.coerce.number().min(0).max(500);

export const careerOnboardingSchema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  linkedinUrl: z.union([z.string().url().max(500), z.literal("")]).optional(),
  experienceYears: z.coerce.number().int().min(0).max(50),
  experienceMonths: z.coerce.number().int().min(0).max(11),
  noticePeriodDays: z.coerce.number().int().min(0).max(180),
  jobFunction: z.string().min(1).max(120),
  currentSalaryLakhs: lakhs,
  expectedSalaryLakhs: lakhs,
  currentLocation: z.string().min(2).max(200),
  preferredLocation: z.string().min(2).max(200),
});

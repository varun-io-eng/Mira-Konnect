import { JOB_FUNCTION_OPTIONS } from "@/lib/validations/career-onboarding";

const QUERY_HINTS: { pattern: RegExp; option: (typeof JOB_FUNCTION_OPTIONS)[number] }[] = [
  { pattern: /\b(it|software|engineer|developer|tech|devops|data)\b/i, option: "Engineering / IT" },
  { pattern: /\b(sales|bd|business development)\b/i, option: "Sales & Business Development" },
  { pattern: /\b(marketing|digital|seo|content)\b/i, option: "Marketing & Digital" },
  { pattern: /\b(ops|operations|supply|logistics)\b/i, option: "Operations & Supply Chain" },
  { pattern: /\b(hr|human resources|recruit)\b/i, option: "Human Resources" },
  { pattern: /\b(finance|account|audit)\b/i, option: "Finance & Accounts" },
  { pattern: /\b(manufactur|production|plant)\b/i, option: "Manufacturing & Production" },
  { pattern: /\b(pharma|life science|clinical|biotech)\b/i, option: "Pharma & Life Sciences" },
  { pattern: /\b(hotel|hospitality|customer service|front office)\b/i, option: "Hospitality & Customer Service" },
];

/** Best-effort map from a home-page job keyword search to onboarding job function */
export function guessJobFunctionFromQuery(query: string): string | undefined {
  const q = query.trim();
  if (!q) return undefined;

  const lower = q.toLowerCase();
  for (const option of JOB_FUNCTION_OPTIONS) {
    if (option.toLowerCase().includes(lower) || lower.includes(option.toLowerCase().slice(0, 8))) {
      return option;
    }
  }
  for (const { pattern, option } of QUERY_HINTS) {
    if (pattern.test(q)) return option;
  }
  return undefined;
}

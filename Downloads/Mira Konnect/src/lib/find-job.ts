/** Query flag: run auth + career onboarding before browsing jobs */
export const FIND_JOB_QUERY = "find";
export const FIND_JOB_VALUE = "1";

/** After sign-in + onboarding from home search, apply profile-aware matching */
export const MATCHED_QUERY = "matched";
export const MATCHED_VALUE = "1";

export type JobSearchFilters = {
  q?: string;
  location?: string;
  industry?: string;
  type?: string;
};

const FILTER_KEYS = ["q", "location", "industry", "type"] as const;

export function buildJobsSearchParams(
  filters?: JobSearchFilters,
  options?: { find?: boolean },
): URLSearchParams {
  const params = new URLSearchParams();
  if (options?.find) {
    params.set(FIND_JOB_QUERY, FIND_JOB_VALUE);
  }
  if (filters?.q?.trim()) params.set("q", filters.q.trim());
  if (filters?.location?.trim()) params.set("location", filters.location.trim());
  if (filters?.industry?.trim()) params.set("industry", filters.industry.trim());
  if (filters?.type?.trim()) params.set("type", filters.type.trim());
  return params;
}

export function jobsPath(
  filters?: JobSearchFilters,
  options?: { find?: boolean },
): string {
  const params = buildJobsSearchParams(filters, options);
  const qs = params.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

export function findJobPath(filters?: JobSearchFilters): string {
  return jobsPath(filters, { find: true });
}

export function loginPathForFindJob(filters?: JobSearchFilters): string {
  return `/login?next=${encodeURIComponent(findJobPath(filters))}`;
}

export function registerPathForFindJob(filters?: JobSearchFilters): string {
  return `/register?next=${encodeURIComponent(findJobPath(filters))}`;
}

/** Listing URL with search filters but without the find=1 gate */
export function jobsListingPathFromSearchParams(
  sp: Record<string, string | undefined>,
  options?: { matched?: boolean },
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    if (key === "find" || key === MATCHED_QUERY || value === undefined || value === "") continue;
    params.set(key, value);
  }
  if (options?.matched) {
    params.set(MATCHED_QUERY, MATCHED_VALUE);
  }
  const qs = params.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}

export function jobSearchFiltersFromSearchParams(
  sp: Record<string, string | undefined>,
): JobSearchFilters {
  return {
    q: sp.q,
    location: sp.location,
    industry: sp.industry,
    type: sp.type,
  };
}

/** True when auth should continue the Find a Job (candidate) journey */
export function isFindJobRedirect(next: string | null | undefined): boolean {
  if (!next || typeof next !== "string") return false;
  const value = next.trim();
  if (!value.startsWith("/jobs")) return false;
  return value.includes(`${FIND_JOB_QUERY}=${FIND_JOB_VALUE}`);
}

export function isJobSearchFilterKey(key: string): boolean {
  return (FILTER_KEYS as readonly string[]).includes(key);
}

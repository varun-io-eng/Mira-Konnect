# Mira Konnect — Platform Architecture & Implementation Plan

**Company name (canonical):** Mira Konnect  
**Tagline:** Connecting the Right Talent with the Right Opportunity  
**Document version:** 1.0  
**Status:** Greenfield — workspace empty at plan creation

---

## 1. Requirement Analysis

### 1.1 Product vision

Mira Konnect is a **multi-sided recruitment ecosystem**, not a marketing-only site. Three audiences share one platform:

| Audience | Primary goals |
|----------|----------------|
| **Candidates** | Discover jobs, apply, manage profile/resume, track pipeline |
| **Employers** | Submit requirements, post jobs (where permitted), review candidates, interviews, offers |
| **Mira Konnect HR** | Full recruitment ops: sourcing → placement, CMS, leads, analytics |

### 1.2 Functional domains

1. **Public marketing & SEO** — Homepage, services, industries, employer/job-seeker landing pages, blog, legal, SEO landing pages (`/recruitment-services/*`).
2. **Job board** — DB-backed search, filters, sort, pagination, job detail with `JobPosting` schema.
3. **Candidate portal** — Auth, profile, resume (object storage), applications, saved jobs, notifications.
4. **Employer portal** — Company profile, hiring requirements, jobs, pipeline, authorized resume access.
5. **Recruiter workspace** — Scoped jobs/candidates/applications, screening, interviews, feedback.
6. **Admin / Super Admin** — SaaS-style dashboard, CMS, RBAC, leads, settings, internal analytics.
7. **Cross-cutting** — Email/notifications, audit logs, GA4, GSC readiness, security, accessibility.

### 1.3 Non-functional requirements

- **Security:** PII (resumes, contact data); server-side RBAC; no public resume URLs.
- **SEO:** Per-page metadata, sitemap, robots, structured data; no fake statistics.
- **Performance:** Lighthouse targets 90+ (perf/a11y/best practices), SEO 95+.
- **Content:** HR-editable via admin CMS (not developer-dependent for copy).
- **Brand:** Original visual identity; TekPillar/modern ATS as **IA/UX inspiration only**.
- **Extensibility:** Optional future AI (matching, parsing) as pluggable modules.

### 1.4 Explicit constraints from client

- Ten industries; defined service lists for clients and candidates.
- Five **initial sample jobs** (Ahmedabad/Mumbai/Vadodara, etc.) — **seed data**, admin-manageable.
- Confidentiality and ethics messaging; no invented placement/client counts.
- Name **Mira Konnect** everywhere — no variant spellings.

### 1.5 Out of scope for V1 (unless listed in MVP)

- Live AI resume parsing/scoring (architecture hooks only).
- Full data export/GDPR automation (architecture support, minimal UI).
- Native mobile apps.

---

## 2. Recommended Architecture (High Level)

**Recommendation:** **Unified Next.js full-stack** with **PostgreSQL** and **Prisma**, plus **S3-compatible object storage**.

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Web app | Next.js 15 (App Router), TypeScript, React | SSR/SSG for SEO, API routes/Server Actions, one deployable unit |
| UI | Tailwind CSS + shadcn/ui | Fast, accessible components; consistent design system |
| ORM / DB | Prisma + PostgreSQL | Relational model fits recruitment workflows; migrations |
| Auth | **Auth.js (NextAuth v5)** or **Better Auth** | Production sessions, credentials + optional OAuth later; JWT for API if needed |
| File storage | AWS S3 (or MinIO locally, R2, etc.) | Resumes not in DB; presigned uploads/downloads |
| Email | Resend / SMTP via env | Templates in DB or filesystem; no secrets in client |
| Search (V1) | PostgreSQL `ILIKE` + indexes; optional `pg_trgm` | Real DB search; Elasticsearch/Typesense in Phase 2 |
| Background jobs | Vercel Cron / Inngest / BullMQ + Redis (Phase 2) | Interview reminders, email retries |
| Hosting | Vercel (app) + managed Postgres (Neon/Supabase/RDS) + S3 | Common, scalable pattern |

**Not recommended for V1:** Separate FastAPI service unless team is Python-heavy — adds CORS, dual deploy, and auth duplication. Next.js API + Server Actions cover the spec with less operational surface.

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│  Public (RSC/SSG) │ Dashboards │ API Routes │ Server Actions │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
     ┌───────▼───────┐               ┌───────▼───────┐
     │  PostgreSQL   │               │  S3 / Object  │
     │   (Prisma)    │               │    Storage    │
     └───────────────┘               └───────────────┘
             │
     ┌───────▼───────┐
     │ Email (SMTP)  │
     │ GA4 (client)  │
     └───────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Structure

```
src/
  app/                    # App Router — route groups
    (public)/             # Marketing + job board + blog
    (auth)/               # login, register, forgot-password
    (candidate)/          # candidate dashboard layouts
    (employer)/           # employer dashboard
    (recruiter)/          # recruiter dashboard
    (admin)/              # admin — separate layout, stricter guards
  components/
    ui/                   # shadcn
    marketing/            # Hero, IndustryCard, etc.
    jobs/                 # JobCard, JobSearch, JobFilters
    dashboard/            # Sidebar, DataTable, Timeline
  lib/
    auth/                 # session helpers, role checks
    db/                   # prisma client
    storage/              # S3 presign
    seo/                  # metadata builders, JSON-LD
    analytics/            # GA4 events
    validations/          # Zod schemas
  hooks/
  types/
```

### 3.2 Rendering strategy

| Area | Strategy |
|------|----------|
| Homepage, About, Services, Industries, static CMS pages | **ISR** or SSG with revalidate; fetch from DB/CMS |
| `/jobs`, `/jobs/[slug]` | **SSR** or ISR (short revalidate) for fresh listings + SEO |
| Blog list/detail | SSG/ISR per publish state |
| Dashboards | **Client + Server Components**; dynamic, `noindex` |
| Admin CMS | Server Components + mutations via Server Actions |

### 3.3 State & data fetching

- **Server Components** default for public pages (SEO, less JS).
- **TanStack Query** (optional) for heavy dashboard filtering; otherwise Server Actions + `revalidatePath`.
- Forms: **React Hook Form + Zod**; shared schemas with API validation.

### 3.4 Design system

- **Tokens:** CSS variables in `globals.css` — primary (deep teal/navy), accent (warm coral or gold sparingly), neutrals, semantic colors for status badges.
- **Typography:** Distinct pairing (e.g. **DM Sans** + **Fraunces** or **Plus Jakarta Sans** + **Source Serif 4**) — not generic Inter-only.
- **Motion:** Framer Motion — subtle section reveals, respect `prefers-reduced-motion`.
- **Components:** Navbar, Footer, JobCard, ApplicationTimeline, StatusBadge, FileUploader, Empty/Error states per spec §39.

---

## 4. Backend Architecture

### 4.1 API style

- **Server Actions** for form mutations (apply, contact, CMS saves) with Zod + RBAC middleware.
- **Route Handlers** (`app/api/v1/*`) for:
  - File upload initiation (presigned URL)
  - Webhooks (future)
  - Public job search JSON (if needed for client-side filter UX without full page reload)

### 4.2 Service layer

```
lib/services/
  jobs.service.ts
  applications.service.ts
  candidates.service.ts
  employers.service.ts
  interviews.service.ts
  notifications.service.ts
  cms.service.ts
  analytics.service.ts
```

- Controllers (route handlers/actions) stay thin; **authorization in service layer** before DB access.
- **AuditLog** written on sensitive mutations (status changes, resume download).

### 4.3 Validation & errors

- Zod at boundary; map Prisma errors to safe user messages.
- Rate limiting: `@upstash/ratelimit` or middleware on auth/contact/apply endpoints.

---

## 5. Database Schema (Conceptual)

Prisma models align with spec §36. Key relationships:

### 5.1 Identity & RBAC

- **User** — email, password hash, name, phone, `roleId`, status, emailVerified.
- **Role** — `SUPER_ADMIN`, `ADMIN`, `RECRUITER`, `EMPLOYER`, `CANDIDATE` (+ optional `Permission` join for fine-grained Phase 2).
- **Recruiter** — `userId`, department, `assignedEmployerIds` or join table **RecruiterAssignment**.

### 5.2 Candidate domain

- **Candidate** — `userId`, headline, summary, expectedSalary, noticePeriod, locations (JSON or **CandidatePreferredLocation**).
- **CandidateEducation**, **CandidateExperience**, **CandidateSkill**
- **Resume** — metadata only: `storageKey`, `fileName`, `mimeType`, `sizeBytes`, `isPrimary`

### 5.3 Employer domain

- **Employer** — `userId`, approval status (`PENDING`, `ACTIVE`, `SUSPENDED`).
- **Company** — name, industry, website, logo (optional storage key), address.
- **HiringRequirement** — employer, positions, timeline, description, status, assigned recruiter.

### 5.4 Jobs

- **Job** — title, slug (unique), description, responsibilities, requirements, benefits, location, industryId, department, employmentType, experienceMin/Max, salaryMin/Max/salaryDisplay, openings, priority, status (`DRAFT`, `PUBLISHED`, `CLOSED`), `employerId` (nullable for Mira Konnect–owned postings), `postedByUserId`, deadline.
- **JobSkill** — jobId, skill name.

### 5.5 Applications & pipeline

- **Application** — candidateId, jobId, employerId, recruiterId, status (enum per spec), notes, `withdrawnAt`.
- **ApplicationStatusHistory** — applicationId, fromStatus, toStatus, changedByUserId, note, createdAt.
- **SavedJob** — candidateId, jobId (unique pair).

### 5.6 Interviews & offers

- **Interview** — applicationId, scheduledAt, type, meetingLink, status, interviewerName/email.
- **InterviewFeedback** — interviewId, rating, strengths, concerns, recommendation.
- **Offer** — applicationId, salary, startDate, status, documentKey (optional).
- **Placement** — applicationId, joinedAt, confirmation notes.

### 5.7 CMS & marketing

- **Industry**, **Service** (type: `EMPLOYER` | `CANDIDATE`), **FAQ**, **Testimonial** (type: candidate | client), **Blog**, **BlogCategory**, **BlogTag** (many-to-many).
- **SiteSettings** — key/value JSON (contact info, footer, hero snippets).
- **SEOSettings** — per route or entity: title, description, canonical, ogImage.
- **PageContent** — slug, blocks JSON for flexible homepage sections (optional normalized **ContentBlock**).

### 5.8 Leads & comms

- **ContactLead** — form fields + status + assignedRecruiterId + notes.
- **EmployerLead** — hiring form submissions (or unified **Lead** with type discriminator).
- **Notification** — userId, type, payload JSON, readAt.
- **EmailTemplate** — slug, subject, htmlBody (admin-editable Phase 2).

### 5.9 Indexes (critical)

- `Job(status, publishedAt)`, `Job(slug)`, GIN/trgm on `Job.title` + description (Phase 1.5).
- `Application(candidateId)`, `Application(jobId)`, `Application(status)`.
- `User(email)` unique.

---

## 6. Authentication Strategy

### 6.1 Approach

- **Email + password** for all roles; bcrypt/argon2 via auth library.
- **Session:** HTTP-only secure cookies; database sessions (Auth.js) for revocation.
- **Registration flows:**
  - **Candidate:** self-serve register → role `CANDIDATE` → create `Candidate` profile.
  - **Employer:** register → `PENDING` until admin approves (or email verify + manual approve).
  - **Recruiter/Admin:** invite-only or Super Admin creates user (no public recruiter signup).

### 6.2 Security practices

- Email verification (recommended before apply).
- Password reset via time-limited token.
- Optional MFA for Admin/Super Admin (Phase 2).
- CSRF protection via framework defaults on Server Actions.

### 6.3 Session authorization pattern

```ts
// Every protected handler:
const session = await requireAuth();
await assertRole(session, ['RECRUITER', 'ADMIN']);
await assertCanAccessApplication(session, applicationId);
```

Never trust `role` from client JSON alone.

---

## 7. RBAC Strategy

### 7.1 Role matrix (summary)

| Resource | SUPER_ADMIN | ADMIN | RECRUITER | EMPLOYER | CANDIDATE |
|----------|-------------|-------|-----------|----------|-----------|
| All users/settings | ✓ | ✓ (limited) | ✗ | ✗ | ✗ |
| CMS / SEO | ✓ | ✓ | ✗ | ✗ | ✗ |
| Jobs (all) | ✓ | ✓ | assigned | own company | read published |
| Candidates PII | ✓ | ✓ | assigned apps | shortlist only | self only |
| Applications | ✓ | ✓ | assigned | own jobs | own |
| Resumes download | ✓ | ✓ | authorized | authorized | own |
| Leads | ✓ | ✓ | assigned | ✗ | ✗ |

### 7.2 Enforcement

1. **Middleware** — route prefix checks (`/admin`, `/employer`, etc.) + session presence.
2. **Service layer** — row-level checks (e.g. `application.job.employerId === session.employerId`).
3. **Recruiter scope** — `RecruiterJobAssignment` / `RecruiterEmployerAssignment` tables.
4. **Prisma extension or policy helpers** — centralize `where` clauses for list endpoints.

### 7.3 Dashboard routing

After login, redirect by role:

- `CANDIDATE` → `/candidate/dashboard`
- `EMPLOYER` → `/employer/dashboard`
- `RECRUITER` → `/recruiter/dashboard`
- `ADMIN` / `SUPER_ADMIN` → `/admin`

---

## 8. Route Structure

### 8.1 Public

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/about` | About Mira Konnect |
| `/services` | Services (CMS) |
| `/industries` | Industries grid |
| `/jobs` | Job board |
| `/jobs/[slug]` | Job detail |
| `/for-employers` | Employer conversion |
| `/for-job-seekers` | Candidate conversion |
| `/how-we-work` | Process |
| `/contact` | Contact + employer hiring form |
| `/blog`, `/blog/[slug]` | Resources |
| `/faq` | FAQ |
| `/privacy-policy`, `/terms-and-conditions` | Legal |
| `/recruitment-services` | SEO hub |
| `/recruitment-services/[industry]` | SEO landing (pharma, IT, etc.) |

### 8.2 Auth

| Path | Purpose |
|------|---------|
| `/login` | Unified login |
| `/register` | Candidate (default) |
| `/register/employer` | Employer signup |
| `/forgot-password`, `/reset-password` | Recovery |

### 8.3 Candidate (private, noindex)

`/candidate/dashboard`, `/candidate/profile`, `/candidate/resume`, `/candidate/applications`, `/candidate/applications/[id]`, `/candidate/saved-jobs`, `/candidate/notifications`, `/candidate/settings`

### 8.4 Employer (private)

`/employer/dashboard`, `/employer/company`, `/employer/requirements`, `/employer/jobs`, `/employer/jobs/new`, `/employer/jobs/[id]`, `/employer/candidates`, `/employer/applications/[id]`, `/employer/interviews`, `/employer/settings`

### 8.5 Recruiter (private)

`/recruiter/dashboard`, `/recruiter/jobs`, `/recruiter/candidates`, `/recruiter/applications`, `/recruiter/interviews`, `/recruiter/leads`, `/recruiter/placements`

### 8.6 Admin (private)

`/admin` (dashboard), `/admin/jobs`, `/admin/candidates`, `/admin/employers`, `/admin/applications`, `/admin/interviews`, `/admin/offers`, `/admin/placements`, `/admin/industries`, `/admin/services`, `/admin/blog`, `/admin/testimonials`, `/admin/content`, `/admin/leads`, `/admin/notifications`, `/admin/users`, `/admin/roles`, `/admin/seo`, `/admin/analytics`, `/admin/settings`

### 8.7 API (versioned)

`/api/v1/jobs`, `/api/v1/applications`, `/api/v1/uploads/resume`, `/api/v1/contact`, `/api/health`, `/api/auth/*`

---

## 9. API Structure

REST-ish JSON under `/api/v1` with consistent envelope:

```json
{ "data": {}, "error": null, "meta": { "page": 1, "total": 100 } }
```

| Module | Endpoints (examples) |
|--------|----------------------|
| Auth | Handled by Auth.js routes |
| Jobs | `GET /jobs`, `GET /jobs/:slug`, `POST /jobs` (employer/admin), `PATCH /jobs/:id` |
| Applications | `POST /applications`, `GET /applications`, `PATCH /applications/:id/status` |
| Candidates | `GET/PATCH /candidates/me`, `GET /candidates/:id` (scoped) |
| Employers | `GET/PATCH /employers/me`, requirements CRUD |
| Interviews | CRUD + feedback sub-resource |
| CMS Public | `GET /content/:key` (optional; prefer RSC direct DB) |
| Admin | Namespaced under server actions + admin-only routes |
| Leads | `POST /contact`, `POST /employer-inquiry` |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read` |
| Analytics | `GET /admin/analytics/summary` (DB metrics only) |

**Idempotency:** Apply once per candidate+job (DB unique constraint).

---

## 10. File Storage Strategy

- **Bucket:** private `mira-konnect-resumes-{env}`; optional public bucket for blog/CMS images only.
- **Upload flow:** Authenticated client requests presigned POST/PUT → uploads direct to S3 → client confirms → API saves **Resume** row.
- **Download:** Short-lived presigned GET; log in **AuditLog** (who, which resume, when).
- **Validation:** MIME whitelist (pdf, doc, docx), max size (e.g. 5MB), optional virus scan (Phase 2).
- **Keys:** `resumes/{candidateId}/{uuid}-{sanitizedFilename}`

---

## 11. SEO Strategy

### 11.1 On-page

- `generateMetadata()` per route from **SEOSettings** + entity fields.
- Single H1 per page; logical H2/H3.
- Internal links: jobs ↔ industries ↔ services ↔ blog.
- Image `alt` from CMS.

### 11.2 Technical

- `app/robots.ts`, `app/sitemap.ts` — dynamic jobs + blog URLs.
- Canonical: `NEXT_PUBLIC_SITE_URL` + path.
- `noindex` on all `/admin`, `/candidate`, `/employer`, `/recruiter`, auth pages.

### 11.3 Structured data (JSON-LD)

- **Organization** + **LocalBusiness** (contact address from settings) on homepage.
- **JobPosting** on `/jobs/[slug]`.
- **Article** on blog posts.
- **BreadcrumbList** on job detail, blog, SEO landings.

### 11.4 Content SEO

- `/recruitment-services/*` pages with natural keywords (India, Gujarat, Ahmedabad, industry-specific) — no stuffing.
- Job slugs: `{title}-{city}` normalized, unique suffix if collision.

---

## 12. Google Analytics 4 Architecture

- Env: `NEXT_PUBLIC_GA_ID` — load gtag only in production or when set.
- `lib/analytics/gtag.ts` — `pageview`, `event(name, params)`.
- **App Router:** track page views on route change via client component wrapper.
- **Events:** `job_search`, `job_view`, `apply_click`, `application_submit`, `contact_submit`, `employer_inquiry`, `sign_up`, `login`, `resume_upload`, `job_save`, `interview_scheduled`.
- **Privacy:** Cookie/consent banner if serving EU/UK traffic; respect consent before loading GA.
- **Admin analytics:** Recruitment KPIs from **PostgreSQL**, not GA.

---

## 13. Google Search Console Setup Plan

**Documentation:** `docs/GOOGLE_SEARCH_CONSOLE.md` (to be created at deploy time).

Steps for production:

1. Deploy to canonical domain (HTTPS).
2. Verify ownership: DNS TXT or HTML file via hosting.
3. Submit `https://{domain}/sitemap.xml`.
4. Inspect URL templates: homepage, `/jobs`, sample job, `/blog` post.
5. Monitor Coverage, Core Web Vitals, structured data reports for JobPosting.
6. **Do not** claim verification in UI until client completes steps.

Checklist: no accidental `noindex` on jobs/blog; robots allow public paths; canonical matches live URL.

---

## 14. Deployment Architecture

| Component | Suggested target |
|-----------|------------------|
| Next.js | Vercel (or Docker on AWS/GCP) |
| PostgreSQL | Neon, Supabase, or RDS |
| Redis | Upstash (rate limit, queues Phase 2) |
| S3 | AWS S3 + IAM user with minimal policy |
| Email | Resend / SES |
| Secrets | Vercel env / AWS Secrets Manager |
| CI | GitHub Actions: lint, typecheck, prisma migrate, test |
| Environments | `development`, `staging`, `production` |

**Migrations:** Prisma migrate in CI/CD before deploy.  
**Seed:** `prisma/seed.ts` — demo flag `IS_DEMO_SEED=true`; industries, services, 5 client jobs, sample users.

---

## 15. Development Phases (Aligned to Spec §47)

| Phase | Deliverable |
|-------|-------------|
| 1–2 | This document + repo scaffold |
| 3–5 | Routes shell, Prisma schema, design tokens, shadcn |
| 6 | Public site (homepage → contact, blog read) |
| 7 | Auth + RBAC middleware |
| 8 | Candidate profile, apply, dashboard |
| 9 | Employer portal + requirements |
| 10 | Recruiter + Admin dashboards (core modules) |
| 11 | Application workflow, interviews, offers |
| 12 | CMS admin for content/services/jobs |
| 13 | SEO (sitemap, JSON-LD, SEO pages) |
| 14 | GA4 events |
| 15 | GSC doc + final SEO pass |
| 16–18 | Security review, perf, QA |

**Incremental implementation order after plan approval:** Scaffold → DB + seed → Public homepage + jobs → Auth → Apply flow → Admin jobs CMS → Expand dashboards.

---

## 16. Estimated Implementation Complexity

| Area | Relative effort | Notes |
|------|-----------------|-------|
| Public marketing + design system | **L** | High polish expectation |
| Job board + SEO job pages | **M** | |
| Auth + RBAC | **M** | Critical path |
| Candidate portal | **L** | Profile, resume, applications |
| Employer portal | **L** | Pipeline parity with spec |
| Recruiter + Admin (20 modules) | **XL** | Largest surface; stagger modules |
| CMS | **M** | |
| Notifications + email | **M** | |
| Analytics + audit | **S–M** | |

**Overall:** **Large enterprise-style MVP** — approximately **8–14 weeks** for a small senior team (2–3 devs) for full spec; **4–6 weeks** for tightened MVP (below).

---

## 17. Potential Risks

| Risk | Mitigation |
|------|------------|
| Scope creep (20 admin modules) | MVP module list; Phase 2 for offers/placements depth |
| RBAC bugs exposing PII | Service-layer tests; security review; audit logs |
| SEO vs. authenticated overlap | Strict route groups; tests for metadata |
| Resume storage misconfiguration | Private bucket only; integration tests for presign |
| Performance on job search | Indexes, pagination, defer full-text to Phase 2 |
| Employer-created jobs vs. recruiter-owned | Clear `Job.employerId` and approval workflow |
| Fake stats in content | CMS validation; seed review |
| Email deliverability | Verified domain, Resend/SES, bounce handling Phase 2 |

---

## 18. MVP vs Phase 2

### MVP (recommended first release)

- Full **public website** + CMS for main pages, services, industries, FAQs, testimonials (read + basic admin edit).
- **Job board** + detail + **5 seeded jobs** + admin job CRUD (publish/close).
- **Candidate:** register/login, profile (core fields), resume upload, apply, track status, saved jobs.
- **Employer:** register (approval), company profile, **hiring requirement** form, view applications for their jobs (if job linked).
- **Admin/Recruiter:** unified admin for jobs, applications, status changes, interviews (schedule + list), contact leads, users (basic).
- **RBAC** enforced server-side for above paths.
- **SEO:** metadata, sitemap, robots, JobPosting schema, recruitment-services hub + 3–5 industry landings.
- **GA4** pageviews + core events.
- **Email:** transactional for apply received, status change, contact ack (templates fixed in code OK for MVP).

### Phase 2

- Full recruiter assignment scoping UI.
- Offers, placements modules, advanced employer pipeline.
- Blog scheduling, rich CMS blocks, email template editor.
- `pg_trgm`/Elasticsearch, AI matching module.
- MFA, advanced analytics dashboards, Inngest reminders.
- Data export / account deletion flows.
- OAuth (Google/LinkedIn) login.

---

## Next Step (Implementation)

Upon approval of this plan, **Phase 3–5** begins:

1. Initialize Next.js + TypeScript + Tailwind + shadcn + Prisma + PostgreSQL.
2. Implement schema + seed (Mira Konnect branding, industries, services, 5 jobs, demo users).
3. Design system + layout (Navbar/Footer) + homepage Hero with CTAs **Find Jobs** / **Hire Talent**.

---

*Mira Konnect — Internal architecture document.*

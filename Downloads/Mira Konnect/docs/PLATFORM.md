# Mira Konnect — Platform setup (MVP)

## 1. Environment

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` — PostgreSQL connection string (required)
- `AUTH_SECRET` — at least 16 random characters (required for login)
- `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000`

## 2. Database

```bash
npm run db:migrate
npm run db:seed
```

## 3. Run

```bash
npm run dev
```

## 4. Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@mirakonnect.demo` | `Demo@12345` |
| Candidate | `candidate@mirakonnect.demo` | `Demo@12345` |
| Employer | `employer@mirakonnect.demo` | `Demo@12345` |

## 5. What works in this MVP

- **Public:** marketing pages, job board, job detail, blog (seeded posts), contact form → `ContactLead`
- **Auth:** register (candidate/employer), login with `?next=` redirect, logout, session cookies (`AUTH_SECRET` required)
- **Candidate:** profile, resume upload (local `private/uploads`), saved jobs, apply, application + interview visibility
- **Employer:** hiring requirements, view linked applications
- **Admin:** jobs CRUD/publish, applications + status, schedule interviews, blog create/publish, contact leads, employer requirements
- **Email:** hooks log in dev when `EMAIL_FROM` is unset; set provider env in production (Phase 2)

## 6. Not yet in MVP (see `docs/ARCHITECTURE.md`)

- Resume storage on S3, offers/placements UI, full CMS for all pages, recruiter assignment scoping, GA4 events, OAuth, MFA

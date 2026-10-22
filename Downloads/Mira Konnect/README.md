# Mira Konnect

Professional recruitment, staffing, and talent acquisition platform for **Mira Konnect**.

## Documentation

- [Architecture & implementation plan](./docs/ARCHITECTURE.md)
- [Platform MVP setup & demo logins](./docs/PLATFORM.md)
- [Google Search Console setup](./docs/GOOGLE_SEARCH_CONSOLE.md)

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- PostgreSQL + Prisma

## Getting started

```bash
cp .env.example .env
# Set DATABASE_URL and AUTH_SECRET (min 16 chars), then:
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Status

**MVP platform:** public site, job board, auth, candidate/employer/admin dashboards, applications, contact leads, and admin job publishing. See `docs/PLATFORM.md` for demo accounts. Phase 2 items (resume S3, email, full CMS, interviews UI) are in `docs/ARCHITECTURE.md`.

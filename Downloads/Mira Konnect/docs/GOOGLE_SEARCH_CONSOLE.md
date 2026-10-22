# Google Search Console — Mira Konnect

This guide explains how to connect the **production** domain for Mira Konnect to Google Search Console (GSC). Search Console is **not** connected until someone with domain access completes these steps.

## Prerequisites

- Production site deployed over **HTTPS**
- Canonical base URL set in environment: `NEXT_PUBLIC_SITE_URL=https://www.example.com` (use your real domain)
- `robots.txt` and `sitemap.xml` reachable at:
  - `https://www.example.com/robots.txt`
  - `https://www.example.com/sitemap.xml`

## 1. Create a property

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add property type:
   - **Domain** (recommended): covers all subdomains and protocols — requires DNS verification.
   - **URL prefix**: e.g. `https://www.mirakonnect.com` — HTML file or DNS verification.

## 2. Verify ownership

### Option A — DNS TXT (Domain property)

1. Copy the TXT record provided by Google.
2. Add it to your DNS host (where the domain is managed).
3. Wait for propagation (minutes to 48 hours).
4. Click **Verify** in GSC.

### Option B — HTML file (URL prefix)

1. Download the verification file from GSC.
2. Place it in the Next.js `public/` folder **or** serve via your host’s static verification route.
3. Confirm `https://your-domain/googleXXXX.html` returns the file.
4. Verify in GSC.

### Option C — Google Analytics / Tag Manager

If GA4 is already installed with the same Google account and `NEXT_PUBLIC_GA_ID` is live, GSC may offer GA-based verification.

## 3. Submit sitemap

1. In GSC → **Sitemaps**.
2. Enter: `sitemap.xml` (full URL: `https://www.example.com/sitemap.xml`).
3. Submit and monitor for errors.

Ensure job and blog URLs appear in the sitemap only when **published** and **indexable** (no `noindex`).

## 4. Post-launch checks

| Check | Action |
|-------|--------|
| Coverage | Fix 404s on important URLs; resolve accidental `noindex` |
| Job pages | Use URL Inspection → **Test live URL** on a sample `/jobs/[slug]` |
| Structured data | Rich results report for `JobPosting`, `Organization`, `Article` |
| Canonicals | Canonical tags must match the preferred URL (www vs non-www — pick one) |
| robots.txt | Must not block `/jobs` or `/blog` |

## 5. www vs non-www

Choose one canonical host (e.g. `https://www.mirakonnect.com`). Redirect the other variant with 301. Set `NEXT_PUBLIC_SITE_URL` to the chosen canonical.

## 6. Staging environments

Use `noindex` on staging and **do not** add staging URLs to GSC. Only verify production.

## 7. Ongoing

- Review **Core Web Vitals** and **Mobile usability**.
- Monitor **Security issues** and manual actions.
- Re-submit sitemap after major CMS/job volume changes if needed (usually automatic refresh is enough).

---

**Note:** Mira Konnect does not claim GSC connection in the application until verification is completed by the client’s Google account.

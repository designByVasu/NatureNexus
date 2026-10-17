# Prioritized implementation plan

## Phase A — foundation and structure
- Keep the existing Vite/React app and branding; use Wouter routes rather than migrate frameworks.
- Add dedicated pages for meaningful service and industry intent, plus overview/about/contact pages. Share navigation, calls to action and page layout; do not generate city pages or unsupported case studies.
- Add per-route title/description/canonical/social metadata, a maintained route manifest, robots.txt, and sitemap for the known live domain `https://nature-nexus-green.vercel.app/`. Treat `naturenexuswater.com` as proposed only.
- Keep the site useful when JS runs and use the Vercel SPA fallback already present. Route metadata will be updated on navigation; confirm deployment-specific prerendering separately before claiming fully server-rendered SEO.

## Phase B — accuracy and leads
- Remove the unsupported 99.8% claim and broken image references.
- Do not show the enquiry popup on initial arrival.
- Add company, industry, location, capacity/requirement, preferred service, contact and optional details to the existing WhatsApp-based enquiry. Validate lengths/types and show helpful inline errors. Make clear this opens WhatsApp and does not submit to an inbox/CRM.
- Add privacy wording that accurately describes the WhatsApp handoff; do not retain form content in the website.

## Phase C — verification
- Type-check, build, inspect route metadata/links and public resources. Do not invent performance data or claim integrations that have not been configured.
- List Vercel/domain/Search Console/analytics/Google Business Profile/inbox tasks that require owner credentials or verified business details.

# Nature Nexus website audit

Audit basis: source at repository HEAD `087662c`, public site `https://nature-nexus-green.vercel.app/`, and the user-provided SEO/lead-generation brief. This is a source/content audit, not a Search Console, Vercel analytics, PageSpeed or production-server crawl.

## Confirmed findings

- The app is a React 19 + Vite single-page application. `client/src/App.tsx` only maps `/` and `/404`; there are no dedicated service, industry, about, or contact routes.
- `client/index.html` has no useful title, meta description, canonical, Open Graph metadata, sitemap link or social-card description. Analytics script placeholders are undefined at build time and generate Vite warnings.
- `vercel.json` publishes `dist/public` and rewrites all paths to `index.html`, so client-side routes can work, but route-specific HTML metadata is not present in the initial document.
- The home page opens a full-screen enquiry modal by default, obscuring the site's content until a visitor dismisses it.
- The hero contains a `99.8% operational reliability` claim with no supporting evidence in the repository or brief.
- Two image paths use `/manus-storage/...`; neither image is present in the repository's `client/public` directory. Their production availability is unverified.
- Homepage service content currently covers RO, STP, ETP and O&M; the brief also includes ZLD, installation/commissioning, AMC and maintenance support.
- The homepage industry list differs from the requested target segments and has no industry-specific content pages.
- The enquiry form currently collects only name, phone and service and hands off to WhatsApp. There is no business inbox/CRM endpoint or server-side form destination configured in the project. Its destination number and footer email/phone require business-owner confirmation.
- There is no committed `robots.txt`, XML sitemap, route manifest, privacy page, structured data, or explicit page-level metadata implementation.
- No project image assets, real project proof, company credentials, verified address, or evidence-backed testimonials are present in the repository.

## Not verified

- Domain registration/availability for `naturenexuswater.com`, Vercel project deployment settings, production response codes, redirects, Search Console data, analytics, business profile eligibility, keyword volume, PageSpeed/Core Web Vitals, actual service geography, company contact details, and whether manuscript imagery is available from external storage.

## Prioritized implementation plan

1. Establish crawlable routes for the homepage, service overview and key service pages (RO, STP, ETP, ZLD, installation/commissioning, O&M/AMC), industry overview and requested sector pages, about, and contact. Use accurate copy, page titles/descriptions, canonical URLs based on the currently deployed origin, internal links, route manifest, robots.txt and sitemap. Do not add thin city or project pages.
2. Improve conversion UX: stop showing the enquiry overlay on first load; expand the enquiry into useful B2B qualification fields and retain WhatsApp handoff because no secure inbox/CRM integration is configured. State the handoff clearly and include a privacy note. Do not imply data is submitted to a private inbox.
3. Correct unsupported/unverified claims and missing imagery. Remove the unsubstantiated reliability statistic and avoid project/certification claims. Flag existing contact details for owner verification.
4. Add valid Organization structured data only with known facts, accessible page markup and image descriptions; avoid LocalBusiness until eligibility/address is confirmed.
5. Run typecheck/build and route/metadata checks. Owner tasks (domain, Search Console, analytics, GBP, contact verification and inbox integration) remain gated on owner account access/details.

# Proposed architecture

## Local enquiry implementation — Phase 4C/4D

Local code adds a disabled-by-default `POST /api/enquiries` and an installable WordPress plugin in `wordpress-plugin/jobshubhr-enquiries/`. The existing production site and its forms have not been changed. Both Next.js forms remain disabled and the prepared submission hook is not mounted.

Local runtime inspection on 2026-11-26 verified the activated plugin, two unique indexes, restricted service identity, secure Node access using the Windows system certificate store, synthetic WordPress submissions and Mailpit capture. The Next.js handler was invoked directly in an isolated local process; the running development server remained disabled. Production and browser end-to-end behavior remain unverified. HTTP frontend origins are allowed only for localhost/127.0.0.1 in development; WordPress always requires HTTPS.

The route checks a configured HTTPS origin, content type, body size (16 KiB), UUID v4 idempotency key, honeypot and field schema. It forwards normalized data over HTTPS using server-only WordPress application-password credentials and a 10-second timeout. It does not use the published-content client. `ENQUIRIES_ENABLED` and `ENQUIRIES_RATE_LIMIT_VERIFIED` both default to off. The WordPress database limiter uses atomic fixed-window counters: 120 requests globally and 10 per normalized email per hour by default, with keyed email hashes, configurable PHP constants, bounded expiry cleanup and fail-closed errors. Replays and invalid requests consume limits. The per-email limit is not IP protection; trusted proxy identification, edge protection, monitoring and production verification remain blockers. The flag is an operator assertion, not a limiter.

The plugin owns a WordPress database table, not Elementor submission tables. A unique hashed idempotency key enforces one record per request; mismatched payloads conflict. The record is saved before a claimed notification attempt. Statuses are `pending`, `sending`, `failed`, and `accepted`; `accepted` only means `wp_mail()` accepted the request, not inbox delivery. Administrators can filter, inspect and manually retry pending or failed notifications. A crash in `sending` needs manual investigation; delivery may have occurred. Do not blindly resend. There is no automated alert, retry, retention/deletion policy or delivery confirmation; these are production blockers.

The route returns 201 for saved and mailer-accepted, 202 for saved with another notification state, 200 on a duplicate, 409 for a changed payload, 422 for invalid data, and 503 when availability cannot be confirmed. A timeout may occur after storage: retry only with the same key and payload. A 202 is safe operationally only after a responsible person and monitoring/recovery process are agreed and verified. Enquiry content is not logged by the route.

See [staging instructions](ENQUIRY_STAGING.md) for configuration, isolated tests, and rollback. Plugin PHP, WordPress database behavior, real authentication, notification delivery, and frontend browser behavior require isolated staging verification. Hosting, domain routing and production activation remain undecided.

This is a proposal for later approval, not an implemented system or a deployment decision.

## Implemented article integration — Phase 3A

- Published posts are resolved by exact slug at the root-level `src/app/[slug]` route; existing static routes retain precedence. Category, tag and `/home-page/` decisions remain pending. Global trailing-slash behavior is unchanged and requires migration review.
- Server-side reads use `WORDPRESS_API_BASE_URL` when configured, otherwise the public production WordPress REST API. No credentials are required or exposed. Requests use a 10-second timeout and request 300-second revalidation; production cache behavior remains to be verified.
- Lookup distinguishes found, confirmed missing and unavailable responses. The narrowly matched Next.js proxy checks before streaming so confirmed missing posts return HTTP 404 and unavailable upstreams return a retryable HTTP 503; this preflight can add a WordPress request and has not been benchmarked on the intended host.
- Article body HTML is sanitized server-side with `sanitize-html`: permitted semantic text, links, images and tables are retained; scripts, event handlers, inline styles, embeds, forms, unsafe protocols and WordPress admin links are removed. Elementor classes and visual effects are not reproduced. The policy must be reviewed as new content formats are introduced.
- Article metadata maps title, description, public canonical, robots and supported Open Graph/Twitter fields. Schema and sitemap ownership, staging indexing and complete SEO parity remain pending. Article design, accessibility and responsive browser comparison remain pending.

## Components and data flow

1. Visitors access the proposed Next.js public frontend using App Router, React, JavaScript, and Tailwind CSS.
2. Next.js obtains published content through the WordPress REST API. Proposed server-side retrieval and rendering would supply page content, post content, featured images, and applicable Yoast metadata.
3. WordPress continues managing content and its existing MariaDB storage. Database access stays within the backend; Next.js never connects directly to MariaDB.
4. Enquiries would pass through an approved, validated submission integration. Its endpoint, hosting location, authentication requirements, and relationship to Elementor remain pending.

Proposed content flow: visitor → Next.js → WordPress REST API → WordPress/MariaDB; rendered content returns to the visitor. This describes content retrieval, not a database connection from Next.js.

Until an alternative is approved and tested, the current live WordPress site and its enquiry forms remain the operational production system.

## Content and SEO approach — proposed

- Inventory current public routes and map them to Next.js routes before implementation. Preserve URLs where possible; any necessary redirects require review.
- Map published API data to reusable components. Confirm Elementor page-content suitability before choosing a page rendering approach.
- Map available Yoast metadata into appropriate Next.js metadata after checking response structure. Validate canonical URLs, indexing directives, social metadata, and sitemap ownership against the eventual routing arrangement.
- Define caching and content refresh behavior after editorial freshness needs and hosting capabilities are known.
- Review media URLs and image delivery after the CMS location is agreed.

## Enquiry integration — unresolved

Current Elementor forms notify the client by email and store submissions in WordPress. A custom frontend must not assume it can submit to Elementor securely or through a supported public endpoint.

A later approved investigation must establish supported integration options, server-side validation, abuse prevention, secret handling, failure behavior, email delivery, and storage behavior. Any alternative to existing submission storage needs explicit agreement. No form endpoint or backend replacement has been selected.

## Undecided deployment choices

- Next.js hosting provider and runtime capabilities.
- Whether frontend and CMS use separate hosts or a routing/proxy arrangement.
- CMS domain/subdomain and continued administrative access.
- Build, preview, content refresh, media, and production routing configuration.
- Migration sequencing, DNS changes, rollback procedure, and responsible operators.

These choices must be resolved before production migration. No domain or hosting configuration changes are authorized here.

## Risks and required follow-up

| Risk | Follow-up before release |
| --- | --- |
| Elementor content may not map cleanly to custom components | Inspect actual published page responses and approved page references. |
| Enquiries could fail or lose existing storage behavior | Approve an integration and test notification delivery, storage, validation, and failure handling. |
| Changed URLs or metadata could affect SEO | Inventory URLs and verify metadata, canonicals, indexing, sitemaps, and any redirects. |
| CMS relocation could break media or API URLs | Validate the chosen CMS arrangement and content links. |
| Caching or API outages could affect content availability | Agree refresh and error behavior appropriate to hosting and editorial needs. |
| Migration could interrupt the live site | Approve and validate a migration and rollback plan before remote changes. |
| Incomplete references could cause design drift | Obtain detailed desktop and mobile references before implementing affected pages. |

No application code, infrastructure, API integration, or production configuration has been created by this documentation task.

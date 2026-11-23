# Proposed architecture

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

# Task tracker

## Homepage introduction synchronization — 2026-11-25

- Added the owner-supplied recruitment introduction between About Us and Our Services, with responsive industry highlights and the existing Contact Us route.
- The public response available during inspection did not contain the new section; live visual comparison and the specified Roboto fonts remain to be verified. Pending enquiry backend integration and disabled form states are unchanged.
- `npm run lint`, `npm run build`, and `node --test tests/*.test.mjs` passed. Generated homepage HTML places the introduction between the existing sections and contains the Contact Us link and disabled quote button. Browser visual and overflow checks remain pending.

## Phase 4C/4D — local enquiry backend

- Added an opt-in Next.js enquiry endpoint, standalone WordPress plugin, private enquiry admin screen and a prepared but unused frontend submission hook. Existing forms stay disabled and live WordPress remains untouched.
- `npm run lint`, `npm run build`, and `node --test tests/*.test.mjs` passed locally. PHP is not installed in this environment, so PHP syntax and WordPress runtime checks were not run. The first build failed on incompatible route configuration; removing those declarations resolved it.
- A durable public rate limiter, notification monitoring/recovery, retention policy, and staging WordPress/database/mail tests are outstanding. `ENQUIRIES_RATE_LIMIT_VERIFIED` is an operator gate, not an implementation of rate limiting.
- See `docs/ENQUIRY_STAGING.md` for staging installation and verification. Do not enable production submissions before explicit approval and acceptance.

## Current status

Services page: initial implementation completed using the saved WordPress content and existing decorative assets; lint, build, and route response passed. Browser visual and responsive review remains pending.

About Us page: initial implementation completed using saved WordPress content and original assets; lint, build, and route response passed. Desktop, tablet, and mobile visual review remains pending.

Restored the three saved WordPress paragraphs after the homepage FAQ; exact wording, lint, and build verified.

FAQ redesign: implemented with three responsive accordion sections and original images; lint and build passed. Browser visual and interaction review remains pending.

Next.js starter initialization, frontend preparation, header, hero, and the remaining homepage sections are implemented. Homepage visual and interaction review is pending. Stop and wait for project-owner review before starting another task. Remote setup and production changes are not authorized by this tracker.

| Phase / task | Status | Evidence or next action |
| --- | --- | --- |
| Phase 1 — initial inspections | Completed, as reported by project owner | Supplied findings establish public page names, posts API access, Yoast metadata, featured images, and current form behavior. These were not independently rechecked in this task. |
| Local workspace inspection | Completed | Workspace was empty; no existing project documentation, screenshots, or application files were present. |
| Phase 2 — documentation | Completed | Created AGENTS.md, README.md, and the four documentation files. Initially in progress during this task; now complete. |
| Detailed design and route inventory | Pending | Collect page URLs and approved desktop/mobile references under a separately approved task. |
| Next.js initialization | Completed | App Router, JavaScript, React, Tailwind CSS, ESLint, src directory, npm, and @/* alias initialized; lint and build passed. See verification record below. |
| Phase 3 Step 3.1 — starter cleanup and frontend structure | Completed | Minimal placeholder, neutral global styles, basic metadata, and requested directories prepared; lint and build passed. |
| Phase 3 Step 3.2B — responsive header | Implemented; review pending | Logo, navigation, call button, and responsive menu added; lint and build passed. Browser accessibility and visual review remain pending. |
| Phase 3 Step 3.3C — recover hero assets | Completed | Three original images downloaded and verified; hero implementation awaits approval. |
| Phase 3 Step 3.3D — homepage hero | Implemented; review pending | Original local assets, responsive layout, and links added; lint and build passed. Browser visual checks remain pending. |
| Phase 3 Step 3.4 — remaining homepage | Implemented; review pending | Added saved homepage sections, local assets, native FAQ disclosures, and disabled enquiry form. Browser and route review remain pending. |
| Step 3.6.1 — process section refinement | Implemented; review pending | Recreated the boxed red layout and responsive process columns from the saved reference; lint and build passed. |
| Step 3.6.2 — metrics and About Us refinement | Implemented; review pending | Recovered the original transparent cutout and rebuilt the two-column composition. Lint and build passed; browser comparison remains pending. |
| Step 3.6.3 — services refinement | Implemented; review pending | Recovered the original background pattern and recreated the two-card and three-card rows; lint and build passed. |
| Step 3.6.4 — CEO section refinement | Implemented; review pending | Text-first layout and original image sizing adapted from the saved WordPress CSS; lint and build passed. |
| Step 3.6.5 — clients marquee | Implemented; review pending | Added a CSS logo loop and reduced-motion static layout; lint and build passed. Browser verification remains pending. |
| Step 3.6.5A — marquee layout fix | Implemented; review pending | Replaced missing CSS-module mappings with scoped class names; lint and build passed, browser verification pending. |
| Git and GitHub setup | Pending approval | No automatic commits, pushes, or remote setup. |
| Frontend implementation | Pending approval | Faithful reproduction after references and scope are agreed. |
| WordPress content and SEO integration | Pending approval | Inspect actual responses and agree mapping and refresh behavior. |
| Enquiry integration | Pending decision and approval | Confirm a secure supported approach, email notifications, and submission storage behavior. |
| Hosting and routing selection | Pending decision | Resolve frontend hosting, CMS URL arrangement, and public routing. |
| QA | Pending | Validate design, responsive behavior, content, SEO, routes, accessibility, and enquiries once implemented. |
| Migration and deployment | Pending explicit approval | Agree and validate migration and rollback plans; keep the existing live site operational. |

## Completion record — 2026-11-17

- Created the six requested documentation files with confirmed requirements separated from proposals and pending decisions.
- Reviewed documentation for consistency with the supplied scope and evidence limits.
- No application code was written, packages installed, or production/remote services changed.
- No code tests were applicable to this documentation-only change.
- No Git commit or push was performed.

## Outstanding approvals and decisions

Await the project owner's next approved task. Hosting/routing, CMS URL arrangement, secure Elementor submission reuse, complete mobile and page references, and any additional business features remain unresolved. The tracker records pending work; it does not authorize it.

## Initialization verification — 2026-11-17

- Initialized the starter in the existing folder, preserving the existing README, AGENTS.md, and other documentation. Project name: `jobshubhr`. No Git repository was initialized.
- Installed Next.js 16.4.6, React and React DOM 19.3.0, Tailwind CSS and @tailwindcss/turbopack 4.3.3, ESLint 9.39.5, and eslint-config-next 16.4.6. The starter uses JavaScript and `@/*` maps to `src/*`.
- `npm run lint` passed. `npm run build` passed with network access after the sandboxed attempt failed to fetch the starter's Google fonts. Those starter fonts were removed in Step 3.1.
- `npm audit --package-lock-only` reported 14 high-severity findings in development tooling through picomatch (GHSA-fc5q-39xc-vjpf, a regular-expression denial of service); `npm audit --omit=dev --package-lock-only` reported zero vulnerabilities. The advisory lists no patched picomatch version as of this check. No forced fix was run. Reassess and remediate before further development or deployment.
- ESLint 9.39.5 is end-of-life according to https://eslint.org/version-support/; eslint-config-next 16.4.6 declares ESLint >=9.0.0 and lint passed. An upgrade to a supported version needs a separately reviewed compatibility check and approval.
- An offline installation attempt failed due to an empty cache and left two extraneous optional packages reported by `npm ls`; a subsequent npm install succeeded. Review cleanup in a future approved task.
- The starter `.gitignore` excludes node_modules, .next, environment files, and generated outputs. No WordPress, GitHub, or production changes were made.

## Phase 3 Step 3.1 verification — 2026-11-17

- Removed starter promotional content, demo images, favicon, fonts, and unused styles. Added a responsive development placeholder and basic project title metadata.
- Prepared `src/components/layout/`, `src/components/home/`, `src/lib/`, and `public/images/` with `.gitkeep` files. No components, client assets, or API integrations were added.
- `npm run lint` and `npm run build` passed. The build produced Tailwind utility CSS used by the placeholder; the build no longer needs the starter's Google fonts.
- Existing npm audit and ESLint support findings remain unresolved; no dependencies were changed. Detailed design references, hosting, CMS URL, and enquiry integration remain pending.
- No production or GitHub changes were made. Await approval before implementing the header or other frontend sections.

## Phase 3 Step 3.2B — 2026-11-18

- Adjusted desktop header height, logo position, navigation spacing, and call button sizing against the supplied comparison screenshots. Exact visual match still requires browser verification at the same viewport and zoom.
- Reduced the desktop header minimum height from 128px to 112px in response to the supplied reference. Lint and build passed; visual review remains pending.
- Added the responsive shared header using the supplied JPEG and reference screenshots, with the specified routes and telephone link. Exact dimensions and breakpoints remain provisional.
- `npm run lint` and `npm run build` passed. Reviewed menu labels, expanded state, controlled navigation, keyboard-operable native controls, focus indicators, and pathname normalization in code. Browser interaction, visual fidelity, and hydration warnings have not been independently verified in a browser.
- Only the home placeholder currently exists; the other navigation destinations await implementation. No dependencies, WordPress, hosting, or GitHub changes were made.

## Phase 3 Step 3.3C — hero asset recovery

- Downloaded the three images referenced by the saved WordPress CSS from `jobshubhr.com` into `public/images/hero/`, preserving filenames.
- Verified `hero-imgs-Arrows-CF.png` as PNG, 811 × 522, with transparent pixels; it contains both professionals in one image.
- Verified `happy-businesswoman-holding-folder-scaled.jpg` as JPEG, 2560 × 1707, without an alpha channel, and `shape-3.png` as PNG, 1000 × 1000, with transparent pixels.
- No application components or production services were changed. Hero implementation remains pending approval.

## Phase 3 Step 3.3D — homepage hero

- Moved the desktop circle and right-hand content upward and shifted the whole circle slightly left, without changing their sizes. Lint and build passed; visual review remains pending.
- Reduced desktop hero spacing and shifted the circle right. The temporary viewport-based size constraints were reverted at the owner's request, restoring the circle and photograph sizes. Lint and build passed; browser verification remains pending.
- Reduced the space above the red circle and adjusted the people image slightly up and right. Lint and build passed; visual review is pending.
- Centered the people inside the clipped red circle and moved the rotating About Us text onto its perimeter, per the owner's clarification. Lint and build passed; visual review is pending.
- Adjusted the centered hero content width and About Us ring position against the supplied reference, and added slow rotation that respects reduced-motion preferences. The people image remains centered in the red circle. Lint and build passed; browser visual comparison is pending.
- Corrected the tablet-width grid so the description, people composition, and photograph remain side by side rather than placing the description on its own row. Lint and build passed; matching the reference at the user's viewport and zoom still needs visual verification.
- Refined the hero against the supplied desktop reference: widened the content area, adjusted column spacing, raised the people within the circle, repositioned the circular link, and adjusted the photograph crop. Lint and build passed; browser comparison remains pending.
- Replaced the placeholder with a responsive hero using the recovered local images, CSS circle, SVG About Us link, supplied content, and contact CTA. Header remains unchanged.
- `npm run lint` and `npm run build` passed; all three image paths exist locally. Browser preview was unavailable, so desktop, tablet, mobile, breakpoint, and visual-fidelity checks remain pending.
- The responsive grid avoids the original Elementor transforms; exact positioning, crop, and typography require visual review. No dependencies or production changes were made.

## Phase 3 Step 3.4 — remaining homepage

- Implemented process, metrics, About Us, services, CEO, client logos, testimonials, six saved blog entries, recruitment CTA, quote form, FAQ groups, and footer. The existing header and hero were preserved.
- Copied 24 reference images into `public/images/home/`; the existing hero assets and logo remain in use. The saved testimonial markup includes one invalid avatar URL, so testimonial avatars were not reproduced. The WhatsApp widget destination could not be verified and was not added.
- The quote form is disabled and provides the existing phone number as an alternative. No submission integration is implemented.
- `npm run lint` and `npm run build` passed. The generated HTML contains 17 FAQ disclosures and a disabled fieldset; all referenced home image files exist. Browser testing was unavailable, so responsive rendering, FAQ interaction, horizontal scrolling, and visual fidelity remain unverified.
- Blog and other internal routes are preserved from the reference but their pages do not exist locally yet. Client logos and testimonials use keyboard-focusable horizontal scrolling rather than the original automated widgets. Further visual comparison, image/asset review, routing, and form integration require follow-up.

## Step 3.6.1 — process section

- Adjusted the desktop dark circle's position against the supplied crop. Lint and build passed; visual comparison remains pending.
- Reduced the decorative circle and rounded all four container corners. Made the header sticky at the top, with a scrollable responsive menu on short screens. Lint and build passed; browser review remains pending.
- Replaced the full-width cards with a centered red container, CSS background circle, and heading beside the three original process items on desktop. Mobile and tablet use stacked or two-column layouts.
- Verified the three original image files exist; `npm run lint` and `npm run build` passed. Grid children can shrink and the decoration is clipped; browser checks of visual fidelity and horizontal overflow remain pending.
- The saved WordPress CSS uses a background overlay image; the decorative circle is recreated in CSS as requested. No other homepage section was changed.

## Step 3.6.2 — metrics and About Us

- Shifted the businesswoman cutout right to separate it from the diverse-hires badge, matching the supplied reference more closely. Lint and build passed; browser review remains pending.
- Adjusted desktop section width, heading weight, cutout scale, and metric badge sizing against the supplied comparison screenshots. Lint and build passed; browser verification remains pending.
- Recovered the original `happy-businesswoman-holding-folder-removebg-preview.png` from the saved WordPress CSS URL; verified it is a 612 × 408 PNG with an alpha channel.
- Rebuilt metrics and About Us as two desktop columns, with a contained cutout, metric badges, and two-column checklist. Narrow layouts stack the visual and text.
- `npm run lint` and `npm run build` passed. Browser visual, clipping, and horizontal overflow checks were unavailable and remain pending. No other homepage section was modified.

## Step 3.6.3 — services

- Recovered `Pattern-2-Convertido.png` from the saved WordPress CSS URL; verified PNG 1191 × 1191 with alpha. The section repeats it at 50% size with 10% overlay opacity.
- Rebuilt the first row as two cards and the second as three, preserving all five descriptions and restoring saved paragraph/line breaks. Cards use dark borders, red circles, and the reference's 20px radius and responsive padding.
- `npm run lint` and `npm run build` passed. Generated HTML contains all five service headings and references the local pattern. Browser checks of visual fidelity, mobile/tablet layout, and overflow remain pending.

## Step 3.6.4 — CEO section

- Centered the desktop photograph within its column and adjusted the heading, name weight, and biography line height against the supplied reference. Lint and build passed; browser comparison remains pending.
- Positioned the existing biography to the left of the original photograph on desktop, using the saved reference's 75% image width and 15px radius. Tablet and mobile stack text before the image; mobile image width is 50%.
- `npm run lint` and `npm run build` passed; the original image file exists. Browser visual, responsive, and overflow checks remain pending.

## Step 3.6.5 — clients marquee

- Replaced the manual scroller with a 70-second linear leftward CSS loop using two equal logo groups; duplicate logos are hidden from assistive technology. Reduced motion disables animation and wraps one group.
- All 14 original client logo files exist. `npm run lint` and `npm run build` passed. Browser checks of motion, seamlessness, reduced motion, and responsive overflow remain pending.

## Step 3.6.5A — marquee layout fix

- Increased the Our Clients heading to medium weight. Lint and build passed.
- Increased marquee speed to a 55-second cycle and added pause on logo hover. Lint and build passed; browser interaction remains pending verification.
- The existing Turbopack CSS loader emitted the CSS module as ordinary CSS, leaving its imported class mappings undefined in the rendered HTML. Replaced it with uniquely named CSS classes and explicit non-wrapping flex rows.
- The rebuilt HTML contains the named viewport and track, two logo groups and 28 logo instances, with no undefined classes. CSS moves the equal groups left by half the track width; reduced motion disables animation and permits keyboard scrolling through one row.
- `npm run lint` and `npm run build` passed. Browser verification of layout, seam, motion, scrollbar, and responsive behavior remains pending.

## Blog listing — Phase 2

- Phase 3A: added published root-level article lookup, server-side HTML sanitization, Yoast metadata mapping and pre-stream 404/503 handling. Category/tag archives and `/home-page/` remain undecided; browser visual and SEO verification are pending.
- Added the original blog listing route with server-side WordPress posts, 300-second revalidation, featured images, and a progressive Load More link.
- Verified the production build returns 21 cards initially and 27 after Load More with the current WordPress data. Individual article routes remain pending.
- Lint and build passed. Browser screenshot comparison and responsive visual checks remain pending.

## Contact Us — Phase 2

- Matched the WhatsApp launcher's saved gradient and dimensions, refined popup transitions, and reserved footer space for the control. Lint and build passed; browser animation and responsive comparison remain pending.
- Added a single shared WhatsApp popup; the destination matches the saved WordPress Click to Chat configuration. Lint and build passed and generated pages each contain one widget; browser interaction and responsive checks remain pending.
- Refined office typography, reference SVG icons, spacing, and map iframe sizing. Lint and build passed; browser comparison and map rendering remain pending.
- Added the Contact Us route with the reference contact information, five office locations, and original public Google Maps iframe URLs.
- The enquiry fields are editable, but Send is disabled until an approved submission integration is implemented.
- Lint and build passed; the production route returned HTTP 200 with five map iframes. Browser visual, map rendering, and responsive checks remain pending. The WhatsApp destination is unverified.

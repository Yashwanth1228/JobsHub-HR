# Project requirements

## Confirmed requirements

- Project: JobsHub HR, isolated from other client projects.
- Current production website: https://jobshubhr.com/.
- Existing system: WordPress, Elementor, Yoast SEO, existing enquiry forms, and WordPress/MariaDB storage.
- Rebuild the public frontend using Next.js App Router, React, JavaScript (not TypeScript), and Tailwind CSS.
- Retain WordPress as a headless CMS where feasible, using its REST API for published content. Never connect the Next.js frontend directly to MariaDB.
- Public pages include Home, About Us, Services, Our Blog, and Contact Us. Preserve existing public URLs where possible; exact paths still need an inventory.
- Posts REST API access, Yoast SEO metadata, and featured images are available, as confirmed by the project owner.
- Existing Elementor forms send client email notifications and store submissions in WordPress.
- The client must continue receiving enquiries, and the live website must remain operational during development.
- Faithfully reproduce the approved live site. Do not introduce an unsolicited redesign or invent client content or business claims.
- Use Git and GitHub when their setup is approved. Do not automatically commit or push.

## Pending decisions and evidence

- Production hosting, deployment approach, and public routing.
- WordPress CMS URL/subdomain arrangement and any resulting media, canonical, or redirect handling.
- Whether and how Elementor Submissions can be reused securely from a custom frontend. Existing form behavior does not establish a supported public submission API.
- Agreed enquiry integration and validation of notification delivery and submission storage before migration.
- Complete mobile design references and detailed references for individual pages.
- Exact public URL inventory, page content mapping, and whether Elementor page content can be reused through the API.
- Any additional business features; none are authorized by this document.

## Workflow constraints

Inspect before modifying; perform one approved task at a time. Explain dependencies before adding them. Do not modify production WordPress, DNS, hosting, or remote services without explicit approval. Never expose or commit credentials, tokens, passwords, or environment files. Keep proposals separate from confirmed decisions. For code changes, run relevant checks and report pass/fail results. Update the task tracker after completed work.

## Evidence boundary

Site and API facts above were supplied by the project owner. This documentation task inspected the local workspace only. It did not inspect the live website, WordPress admin, API responses, or screenshots. No screenshots or admin evidence were present in the workspace.

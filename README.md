# JobsHub HR

JobsHub HR is a separate client project to rebuild the public frontend of [jobshubhr.com](https://jobshubhr.com/) in Next.js, retaining the existing WordPress installation as a headless CMS where feasible.

## Current status

The Next.js application is initialized with a minimal development placeholder. The frontend structure is prepared; page designs, WordPress integration, and GitHub setup remain pending approval. The live WordPress website must remain operational during development.

Existing public pages include Home, About Us, Services, Our Blog, and Contact Us. The intended result is a faithful reproduction of the approved live site, with public URLs preserved where possible and client enquiries continuing to reach the client.

## Planned stack

- Next.js App Router, React, JavaScript, and Tailwind CSS.
- WordPress REST API for published content, including available Yoast SEO metadata and featured images.
- Existing WordPress/MariaDB for backend content storage; no direct frontend connection to MariaDB.
- Git and GitHub for version control once separately approved.

Production hosting, routing, CMS URL arrangement, and secure form integration remain undecided.

## Local development

Use `npm install` to install dependencies and `npm run dev` to start the development server. Run `npm run lint` and `npm run build` for the project checks. The App Router lives in `src/app/`; future shared layout and homepage components belong in `src/components/`, shared utilities in `src/lib/`, and approved images in `public/images/`.

## Documentation

- [Agent instructions](AGENTS.md)
- [Confirmed requirements and pending decisions](docs/PROJECT_REQUIREMENTS.md)
- [Proposed architecture and risks](docs/ARCHITECTURE.md)
- [Design reference and evidence gaps](docs/DESIGN_REFERENCE.md)
- [Task tracker](docs/TASK_TRACKER.md)

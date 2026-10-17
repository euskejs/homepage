# Codex instructions — kejiashi.info

## Goal
Build a production-ready, responsive personal website for **Kejia Shi** based closely on the provided reference screenshot (`reference-homepage.png`). The screenshot is the visual source of truth for layout, proportions, typography, content hierarchy, and colors. Do not redesign it into a long scrolling marketing site.

## Stack and deployment
- Next.js (App Router), TypeScript, Tailwind CSS; deploy to Vercel.
- Use semantic HTML, accessible navigation, optimized images, responsive design, and SEO metadata.
- Keep public content in one editable data module (e.g. `src/data/site.ts`).
- Never put API keys in client-side code. Provide `.env.example` for any optional AI backend.
- Preserve existing domain `kejiashi.info`; document Vercel deployment and DNS cutover from AWS Route 53 separately. Do not change DNS automatically.

## Visual reference
- `reference-homepage.png` must be copied into the project and used as the design reference, not as the rendered website itself.
- Desktop layout: slim white top navigation; wide hero with a bright blue Dallas skyline background; text on the left and a portrait of Kejia on the right; compact lower two-column area; thin footer.
- Palette: white, dark navy, medium blue for accents/buttons, subtle cool-gray supporting text.
- Elegant serif display headings and restrained sans-serif body/navigation text. Avoid gradients, animated backgrounds, excessive cards, stock graphics, and long pages.
- Keep hero copy readable against the skyline with a subtle light overlay behind the left side if needed.
- Keep portrait modestly sized, matching the screenshot, with head not oversized. If a separate transparent portrait asset is unavailable, request it or use a clearly identified placeholder; do not attempt to crop a clean portrait from the composite mockup and claim it is transparent.
- Use licensed/owned Dallas skyline imagery for production; the screenshot is a visual reference, not necessarily a rights-cleared source image.

## Homepage content
### Header
- Brand: `Kejia Shi` (legal name; not Ken Shi).
- Links: Home, About, Experience, Innovation, AI Twin, Contact. LinkedIn and GitHub icons only if URLs are provided; otherwise omit or mark as pending in content configuration. Avoid dead links.

### Hero
- Eyebrow: `TELECOM · TECHNOLOGY · PEOPLE · IMPACT`
- Headline (exact): `Innovation with Purpose and Impact`
- Body: `Nearly three decades of experience across global telecom vendors and network operators, focused on turning emerging technologies into practical solutions that create business value and improve everyday life.`
- One prominent CTA (exact): `Chat with My AI Twin`. No separate `Learn More` CTA.
- Bright Dallas skyline with Reunion Tower; portrait on right, as shown in screenshot.

### Compact lower section
- Left heading: `Career Journey`
- Subheading: `From technology development to product strategy and network deployment.`
- Horizontal desktop timeline, stacking or scrolling accessibly on mobile:
  - Ericsson — 1997–2015 — Software development, solution architecture, and presales.
  - Huawei — 2015–2018 — 5G product strategy and global business.
  - Reliance Jio — 2018–2019 — CTO office, network strategy and innovation.
  - Verizon — 2019–Present — 6G strategy, AI innovation and ecosystem partnerships.
- Company marks may be used only from approved, properly sourced assets; otherwise render tasteful text labels. Do not fabricate endorsements.
- Right heading: `Key Focus Areas`
- Subheading: `Turning emerging technologies into practical solutions.`
- Four compact icon-and-text items:
  1. `6G & Next-Generation Networks` — New capabilities for real-world applications.
  2. `ISAC and Network Sensing` — Integrating communication and sensing for safer and smarter environments.
  3. `Network Autonomy` — More intelligent, efficient and resilient networks.
  4. `AI Wearables & Experiences` — Connecting people, information and services in everyday life.
- Mention ISAC only once in this homepage focus grid; avoid repetitive descriptions elsewhere.

### Footer
- `Kejia Shi` and `Global Telecom & Technology Strategist`.
- Simple navigation and approved social/contact links. No separate AI Digital Twin promotion/banner.

## AI Twin
- The hero button and `AI Twin` nav link should lead to `/ai-twin`.
- Create a clean dedicated page for the AI digital twin, but do **not** add a second AI Twin section to the homepage.
- Initially support a configurable existing twin URL or backend endpoint; if not provided, show a clearly labeled nonfunctional preview and integration instructions rather than pretending to answer as a live AI.
- When a backend is connected, explain that this is an AI representation, not the person. Restrict responses to approved public biographical and professional content; do not disclose confidential employer details.

## Other pages and behavior
- `About`, `Experience`, `Innovation`, and `Contact` should be concise and consistent with the homepage; prefer focused pages over expanding the homepage vertically.
- Do not invent achievements, publications, degrees, dates, company affiliations, contact details, or social links. Use provided facts and clearly flagged placeholders for missing material.
- Make mobile navigation usable; on small screens, stack hero copy and portrait, then timeline and focus items. Maintain good contrast, keyboard focus, and reduced-motion support.

## Working process for Codex
1. Inspect the existing repository and reuse appropriate project structure and assets.
2. Put the reference screenshot at `public/reference-homepage.png` for local comparison; keep it out of visible UI.
3. Implement the homepage first, comparing against the screenshot at approximately 1536×1024 desktop resolution; then adapt to tablet/mobile.
4. Implement supporting routes and the AI Twin integration placeholder.
5. Run lint, typecheck, and build; fix all errors.
6. Provide README instructions for local development, environment variables, GitHub/Vercel deployment, and Route 53 DNS migration with rollback guidance.
7. Summarize any missing production assets or links without inventing them.

## Acceptance criteria
- Homepage visually resembles the supplied screenshot and fits into a compact desktop viewport.
- White header, Dallas skyline hero, modest portrait, exact tagline, single AI Twin CTA.
- Career timeline and exactly four focus areas including ISAC.
- No redundant AI Twin panel, no extra `Learn More` button, no lengthy marketing copy.
- Responsive, accessible, no broken navigation, builds successfully on Vercel.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

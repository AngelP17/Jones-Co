# Jones & Co. - Agent Guidance

## Start Here

- Active application: `app/`, a React 19 + TypeScript + Vite 7 site styled with Tailwind CSS v3 and Radix/shadcn primitives.
- Deprecated copy: `jones-media-website/`. Do not make product or UI edits there.
- Read `app/README.md` for local setup, routes, assets, and validation.

## Commands

Run commands from `app/`.

```bash
npm ci                    # clean install from package-lock.json
npm run dev               # Vite development server
npm run lint              # ESLint
npm run build             # production bundle
npx tsc -b --pretty false # TypeScript project check
npm run preview           # serve the built bundle locally
```

There is no repository script for tests or formatting in `app/package.json`. Do not claim either was run unless a command is added and verified intentionally.

Deployment uses `wrangler.toml` at the repository root. Cloudflare's `npx wrangler deploy` command runs its configured `app/` install and production build before publishing `app/dist/`.

## Structure And Routing

- `app/src/pages/`: route-level screens.
- `app/src/components/Navbar.tsx` and `Footer.tsx`: shared site shell.
- `app/src/components/ui/`: shadcn-style primitives; preserve their export pattern. ESLint intentionally exempts this folder from the Fast Refresh single-export rule.
- `app/src/hooks/useRouter.ts`: custom hash router. The project does not use React Router for rendered routes.
- `app/src/index.css`: global tokens, self-hosted typography, reveal motion, and reduced-motion behavior.
- `app/public/images/`: local editorial photography placements.
- `app/src/assets/fonts/`: bundled WOFF2 font files.

Preserve these hash routes: `/`, `/services`, `/bundles`, `/student-services`, `/about`, `/contact`, `/thank-you`.

## Content And Integration Constraints

- Preserve service names, package inclusions, and prices unless the user explicitly requests content changes.
- Preserve visible contact details: `+ 870 577 0389` and `jonescopr@gmail.com`.
- Preserve the Formspree endpoint `https://formspree.io/f/xjgeovnd`, hidden fields (`_subject`, `_next`, `_gotcha`, `service`), and thank-you redirect construction in `Contact.tsx`.
- Do not invent clients, testimonials, addresses, outcomes, or metrics. Metrics currently shown in the site derive from existing page content.

## Design Constraints

- Design direction: warm, editorial, high-trust Arkansas service brand; single light theme across navigation, page content, and footer.
- Design dials for this implementation: `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 4`.
- Use CSS variables in `app/src/index.css` for brand colors. Primary buttons must maintain WCAG AA contrast.
- Typography is self-hosted only: Playfair Display for headings, Source Sans 3 for body text, Instrument Serif Italic for limited accent use. Do not add production Google Fonts imports.
- Marketing-page icons use `@tabler/icons-react`; existing UI primitives may continue using `lucide-react`.
- Use locally committed media in `app/public/images/`; do not restore `picsum.photos` or other randomized production image sources.
- Keep the hero visual visible at mobile and desktop widths. All images require meaningful `alt` text and explicit sizing.
- Use `min-h-[100dvh]` for viewport sections; do not use `h-screen`.
- Keep motion restrained and ensure `prefers-reduced-motion: reduce` shows content without animation or hidden reveal states.
- Avoid visible em dash or en dash separators in generated marketing copy.

## Avoid Editing

- `jones-media-website/`: deprecated static copy.
- `app/dist/` and `app/node_modules/`: generated/install output.
- `app/src/components/ui/`: change only when fixing a primitive defect or an explicit UI-system task requires it.
- `app/src/components/HeroScene.tsx`: currently not rendered; do not wire it into pages without an explicit 3D direction and performance review.

## Done When

- Requested behavior or design work is implemented in `app/` without changing preserved routes, pricing, or form integration.
- `npm run lint`, `npx tsc -b --pretty false`, and `npm run build` pass.
- A browser pass checks all routes at desktop width and primary flows at mobile width.
- Design changes are checked for button contrast, keyboard-visible controls, local image/font loading, and reduced-motion behavior.
- Any missing real brand photography, content approval, form-submission testing, or deployment validation is listed explicitly in the handoff.

## Known Unknowns

- Generated editorial photography is currently used because approved brand photography was not supplied.
- There is no automated UI, form-submission, or end-to-end test suite declared in the repository.
- Live Formspree delivery and production hosting behavior require validation outside a local build.

# Jones & Co. Media Web App

Marketing and student-services website built with React, TypeScript, Vite, Tailwind CSS, and Radix/shadcn UI primitives.

## Setup

Requirements: a current Node.js/npm environment compatible with Vite 7.

```bash
npm ci
npm run dev
```

The app uses hash-based client routing, so a local route appears as `http://localhost:5173/#/services`.

## Commands

```bash
npm run dev               # run the Vite development server
npm run lint              # run ESLint across source and configuration files
npx tsc -b --pretty false # type-check the TypeScript projects
npm run build             # build the production files into dist/
npm run preview           # serve dist/ through Vite preview
```

No test runner or formatter command is configured in `package.json`.

## Routes

The custom router in `src/hooks/useRouter.ts` supports:

- `/`
- `/services`
- `/bundles`
- `/student-services`
- `/about`
- `/contact`
- `/thank-you`

Keep these paths stable. The contact page posts to Formspree and constructs a hash-route thank-you return URL.

## Design And Assets

- Brand tokens and global motion behavior live in `src/index.css`.
- The site intentionally uses one warm light theme, including navigation, call-to-action panels, and footer.
- Fonts are bundled in `src/assets/fonts/`; no external font stylesheet is needed in production.
- Editorial image placements are local assets in `public/images/`. They are generated contextual images, not client work or photographs of the owner.
- The unused `src/components/HeroScene.tsx` is not part of the rendered UI.

## Implementation Boundaries

- Work only in this React application; `../jones-media-website/` is a deprecated static copy.
- Preserve service pricing/content, visible contact details, the Formspree endpoint, and hidden form fields unless requirements explicitly change.
- Treat `src/components/ui/` as shadcn-style primitives. Prefer composing these components from pages and shared shell components instead of modifying primitives.

## Manual Review

Before shipping a UI change:

1. Run lint, TypeScript checking, and the production build.
2. Inspect every route at desktop width and the home/contact flows at mobile width.
3. Confirm the hero visual, locally hosted fonts, and local images load.
4. Confirm interactive controls remain usable with keyboard navigation and reduced-motion settings.
5. Validate live form delivery separately when deployment access and a test recipient are available.

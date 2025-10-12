# Repository Guidelines

## Project Structure & Module Organization
This Next.js 15 app uses the App Router. Route segments and server code live in `app/`, with entry points such as `app/page.tsx`, `app/layout.tsx`, and API handlers under `app/api/*`. Reusable UI sits in `components/`, React providers in `contexts/`, and shared hooks in `hooks/`. Business data and copy live in `data/`, while cross-cutting utilities use `lib/`. Global styles reside in `app/globals.css` and `styles/`, and static assets ship from `public/`. Legacy experiments under `CircularTextEffect-main` and `StickySections-main` are reference-only; avoid importing them.

## Build, Test & Development Commands
Install dependencies with `npm install`. Use `npm run dev` for a Turbopack-powered development server, `npm run build` to produce the production bundle, and `npm run start` to serve that build locally. Run `npm run lint` before every commit; it wraps `next lint` and enforces the shared ESLint config. If dependencies change, sanity-check the sitemap with `npx next-sitemap` and regenerate static exports when needed.

## Coding Style & Naming Conventions
TypeScript is required across new modules. Prefer functional components with named exports, and keep filenames in `kebab-case.tsx`. Follow two-space indentation and rely on Prettier defaults in your editor. Import shared code via the path alias `@/...` defined in `tsconfig.json`. Tailwind CSS utility classes should follow logical grouping (layout -> spacing -> color). The ESLint config relaxes unused variable rules for underscore-prefixed names—leverage that to mark intentional gaps.

## Testing Guidelines
Automated testing is not yet wired in; treat linting plus `npm run build` as the minimum regression gate. When you introduce tests, colocate `*.test.tsx` files next to the component or hook they exercise and document the command you add to `package.json`. Aim to cover server actions, high-traffic routes, and custom hooks, and validate responsive states manually in multiple viewports.

## Commit & Pull Request Guidelines
Write imperative, single-line commit subjects (e.g., `feat: add demo booking hero`) and keep scope focused. Reference any related Linear or GitHub issue in the body. For pull requests, include a concise summary, screenshots or screen recordings for UI changes, a checklist of commands you ran, and call out any new environment variables. Ensure PRs have lint and build output attached or pasted.

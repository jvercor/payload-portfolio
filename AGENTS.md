# AGENTS.md

## Overview

This repository powers a **custom Payload CMS + Next.js portfolio platform** featuring a headless backend with portfolio-specific collections, a production-ready frontend, and robust security and extensibility. This guide is for autonomous coding agents and contributors. **Follow these rules and conventions to ensure high-quality, secure, and maintainable contributions.**

### Portfolio Features

This custom implementation extends the base Payload template with portfolio-specific functionality:

- **Experiences**: Showcase professional work history, roles, and achievements
- **Education**: Display educational background, certifications, and credentials
- **Skills**: Categorized skills with proficiency levels and endorsements
- **Learnings**: Track learning paths, courses, and development progress
- **Languages**: Display language proficiencies for multilingual portfolios
- **Posts & Blog**: Content publishing with layout builder for rich storytelling
- **Pages**: Flexible page builder for custom layouts and content
- **Media Management**: Optimized asset handling for images and files
- **SEO & Search**: Full-featured content discovery and search capabilities
- **Draft Preview & Live Preview**: Secure content staging before publication
- **Scheduled Publishing**: Automatic content publication on defined schedules

---

## 1. Project Build/Test/Lint/Typegen Commands

**Dependency manager:** pnpm (`pnpm` required, see engines in package.json)  
**Dev server:** Next.js, Payload

### Install/Upgrade Dependencies

- Install: `pnpm install`
- Upgrade all: `pnpm update`
- Reinstall clean: `pnpm run reinstall`

### Local Development

- Start dev server: `pnpm dev`
- Start in prod mode: `pnpm run dev:prod`
- Start built app: `pnpm start`
- Build for production: `pnpm build`
- Generate sitemap: `pnpm postbuild` _(run after build)_

### Testing

- **ALL tests (integration + e2e):** `pnpm test`
- **Integration tests (vitest):** `pnpm run test:int`
  - Run a single integration test:
    ```
    pnpm vitest run --config ./vitest.config.mts path/to/your-test.spec.ts
    ```
    (If you want to filter by test name, add `-t "test title"`)
- **E2E tests (playwright):** `pnpm run test:e2e`
  - Run one file: `pnpm exec playwright test path/to/file.spec.ts`
  - Filter: `pnpm exec playwright test -g "some test"`
- **Type check:** `pnpm tsc --noEmit`

### Lint/Format

- Run linter: `pnpm lint`
- Lint & auto-fix: `pnpm lint:fix`
- Run Prettier manually: `pnpx prettier --write .`

### Generate Types/Import Map

- Generate Payload types: `pnpm generate:types`
- Generate Admin import map: `pnpm generate:importmap`

---

## 2. Code Style Guidelines

### Imports

- Use ES module syntax (`import ... from`)
- **Always use TypeScript with Payload types:**
  ```ts
  import type { CollectionConfig } from 'payload'
  ```
- **React:** use named/default exports as described in `.cursor/rules/components.md`.
- **No wildcard imports** unless specifically modeled (eg. importing features for richtext fields).
- **Path alias:** Use project aliases configured in `tsconfig.json` where appropriate.

### Formatting & General

- **EditorConfig:** Respect `.editorconfig` if present.
- **Prettier:** Use repository Prettier config (run `pnpx prettier`).
- 2 spaces or tab indentation (per `.editorconfig` / Prettier).
- Always end files with a newline.

### TypeScript

- Always prefer strict typing—no use of `any` except as last resort.
- Export all types used in components/configs.
- Run `pnpm generate:types` after any schema change.
- Use Payload type guards (see `.cursor/rules/field-type-guards.md`) for runtime checks.
- Use type assertions (e.g., `as const`) for select/options arrays.

### Naming Conventions

- **File names**: Kebab-case (`my-component.tsx`, `site-config.ts`)
- **Types/interfaces**: PascalCase (`UserPayload`)
- **Variables/constants**: camelCase
- **Component names**: PascalCase
- **Collection/field slugs**: kebab-case or plain English
- **Environment variables**: ALL_CAPS

### Error Handling

- Where user input is involved, always validate and sanitize.
- Never trust client data or assume shape for external APIs.
- Return clear, actionable errors—prefer Payload's built-in error utilities.
- **Always check for null/undefined** before access.
- Use try/catch on async logic in hooks/endpoints; log via Payload logger, not `console.log`.

### Security (CRITICAL Patterns)

#### **Enforce ALL 3 Patterns:**

- **Local API default access bypass:** ALWAYS add `overrideAccess: false` when using `.find`, `.update`, etc, with a user context (`user:`). Never trust that `user` is sufficient!
- **Transaction safety in hooks:** ALWAYS pass `req` to nested Payload ops in hooks—this preserves atomicity.
- **Prevent infinite hook loops:** When a hook triggers an operation that could re-trigger the same hook, use a context flag (e.g., `context.skipHooks = true`).

Reference `.cursor/rules/security-critical.mdc` for annotated examples.

### React & Payload Admin

- Prefer Server Components; use `'use client'` for interactivity/state.
- Only use Client Components when necessary (state, effects, browser APIs, events).
- Use Payload's `@payloadcms/ui` hooks only inside Client Components (see `.cursor/rules/components.md`).
- Use SCSS/CSS modules and stick to Payload's CSS variables theme if custom styles are needed.

### Schema/Collection Patterns

- Organize each collection and global config in separate files (`src/collections/`, `src/globals/`)
- Use field factories/utilities for common logic.
- Extract hooks and access functions to `hooks/` and `access/` folders.
- Reference `.cursor/rules/collections.md`, `.cursor/rules/fields.md`, `.cursor/rules/hooks.md`, `.cursor/rules/access-control.md` for canonical examples and advanced patterns.

### Plugins

- Implement plugins as pure functions: `(options: PluginOptions) => (config: Config) => Config`
- Always preserve/extensibility—never overwrite user config.
- Always provide type-safe plugin configs; prefer inferable types when possible.
- See `.cursor/rules/plugin-development.md`.

### Testing

- Write integration tests for all non-trivial logic and access control.
- Use Vitest for logic/unit/integration; Playwright for E2E.
- Keep fixtures/fakes deterministic.
- Prefer in-memory DB/test isolation for fast feedback.
- Never commit real secrets; use `.env.example` as template for required env vars.

---

## 3. Reference + Cursor Rules

**Critical developer references:**

- `.cursor/rules/security-critical.mdc` (access control, transactions, hook loops)
- `.cursor/rules/fields.md` (all field types/options/patterns)
- `.cursor/rules/queries.md` (all query patterns/operators)
- `.cursor/rules/collections.md` (collections, auth, upload, drafts)
- `.cursor/rules/components.md` (admin & custom components—client/server patterns)
- `.cursor/rules/hooks.md` (lifecycle, context, best practices)
- `.cursor/rules/access-control.md` (collection/field/global access, RBAC)
- `.cursor/rules/plugin-development.md` (plugin authoring & safety)

Use these as canonical reference—**never improvise patterns where a rule exists.**

---

## 4. Environment & Setup

- All features rely on a valid `.env` file (copy from `.env.example`).
- Required env vars:
  - `DATABASE_URL`
  - `PAYLOAD_SECRET`
  - `NEXT_PUBLIC_SERVER_URL`
  - `CRON_SECRET`
  - `PREVIEW_SECRET`
- Never commit `.env`.

---

## 5. Documentation & PRs

- Comment complex logic and reference rule files for context.
- Follow commit message conventions: imperatives, clear, reference affected area (eg. `fix: access control for posts`, `feat(collections): add 'tags' field`).
- Reference the most closely related `.cursor/rules/` doc in major PRs for agent clarity.

---

## 6. Further Resources

- [Payload CMS docs](https://payloadcms.com/docs)
- Payload Discord: [https://discord.com/invite/payload](https://discord.com/invite/payload)
- See README.md for feature breakdown and deployment strategies.

---

**Always synthesize new code/PRs per these rules—deviations must be justified in PR. For rule disputes/edge-cases, prioritize `.cursor/rules/`, then this AGENTS.md, then README.**

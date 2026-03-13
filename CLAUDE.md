# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A professional resume/CV built with Astro 5, TypeScript, Tailwind CSS, and Zod. Deploys to `https://sudeepg95.github.io/resume`. The CV data is also the master source for a LaTeX PDF resume — changes here sync to `../Sudeep___AwesomeCV_Resume/`.

## Commands

```bash
npm run dev              # Dev server
npm run build            # Production build → dist/
npm run lint             # ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run type-check       # astro check (validates TypeScript + Astro templates)
npm run format           # Prettier formatting
npm run build:production # type-check + build + compress images (full pre-deploy pipeline)
npm run sync:to-latex    # Generate .tex files from CV data → ../Sudeep___AwesomeCV_Resume/
npm run sync:from-latex  # Parse .tex files back into CV data
```

## Architecture

### Single Source of Truth: CV Data

All resume content lives in `src/data/sudeep-cv.ts` as a typed TypeScript object. This is the **only file to edit** when updating resume content.

Data is validated at build time by Zod schemas in `src/utils/schemas/cv-schema.ts` (BasicsSchema, WorkExperienceSchema, EducationSchema, etc.).

### LaTeX Sync Pipeline

The `scripts/sync-to-latex.ts` script reads `sudeep-cv.ts` and generates 6 `.tex` files in `../Sudeep___AwesomeCV_Resume/sudeep/`:
- `main.tex` — document header with personal info
- `subtopics/summary.tex`, `experience.tex`, `skills.tex`, `projects.tex`, `education.tex`

Key transformations performed by the sync script:
- LaTeX special character escaping (`\`, `&`, `%`, `$`, `#`, `~`, `^`)
- Date formatting: ISO `2022-09-01` → `September 22'`
- Phone number formatting with country code

**Workflow for updating the PDF resume:** edit `src/data/sudeep-cv.ts` → `npm run sync:to-latex` → `make sudeep` in `../Sudeep___AwesomeCV_Resume/`.

### Component Structure

- `src/layouts/resume-layout.astro` — root layout (SEO, fonts, global styles)
- `src/components/sections/` — resume sections rendered in order: hero, about, work-experience, skills, education, contact
- `src/components/ui/` — shared UI primitives (dark-mode-toggle)
- `src/utils/` — theme-manager (dark mode + localStorage), scroll-animations, analytics, date-helpers, data-helpers

### Tailwind Theme

Custom tokens defined in `tailwind.config.mjs`:
- Colors: `charcoal` (dark backgrounds) and `blue` (accent)
- Fonts: `Poppins` (sans), `Lora` (serif)
- Custom `shadow-profile` utility

### Path Alias

`~/` maps to `src/` (configured in `tsconfig.json`).

## Deployment

Configured for GitHub Pages via `astro.config.mjs`:
```js
site: "https://sudeepg95.github.io"
base: "/resume"
integrations: [tailwind(), sitemap(), icon()]
```

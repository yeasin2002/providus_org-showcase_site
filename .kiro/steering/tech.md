# Tech Stack

## Core Framework

- **Next.js 15.5.3** with App Router
- **React 19.1.0** with Server Components (RSC)
- **TypeScript 5.9.3** with strict mode enabled

## Styling & UI

- **Tailwind CSS 4.1.14** for utility-first styling
- **shadcn/ui** component library (New York style)
- **Radix UI** for accessible primitives
- **Lucide React** for icons
- **class-variance-authority** and **tailwind-merge** for component variants

## Internationalization

- **next-intl 4.3.12** for i18n routing and translations
- Supported locales: `en` (default), `bn`

## Code Quality

- **Biome 2.2.0** for linting and formatting (replaces ESLint + Prettier)
- Configured with recommended rules for Next.js and React

## Build System

- **Turbopack** enabled for faster development and builds
- **Bun** as package manager (bun.lock present)

## Common Commands

```bash
# Development
bun dev                 # Start dev server with Turbopack

# Production
bun build              # Build for production with Turbopack
bun start              # Start production server

# Code Quality
bun lint               # Run Biome linter
bun format             # Format code with Biome
```

## Path Aliases

- `@/*` maps to `./src/*`
- Component aliases configured in `components.json`

## Backend & Data

- **Supabase** for database and file storage
  - Tables: `churches`, `projects`, `certificates`
  - Storage buckets: `uploads/` (photos/videos), `certificates/` (PDFs)
- **Brevo** for transactional emails (welcome, approval, rejection)

## Media Handling

- **Photos**: Required, max 5MB, JPG/PNG/WebP, auto-optimized
- **Videos**: Optional, max 50MB or YouTube/Vimeo embed, click-to-play only
- Lazy loading for images, optimized thumbnails for cards

## Configuration Notes

- TypeScript build errors are ignored in production
- Images require remote patterns configuration for external sources
- Middleware excludes `/api`, `/trpc`, `/_next`, `/_vercel` routes
- Public pages only show projects with status `approved`
- Admin review page is password-protected at `/admin`

# Project Structure

## Directory Organization

```
src/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   │   ├── layout.tsx       # Root layout per locale
│   │   ├── page.tsx         # Home page
│   │   └── [routes]/        # Feature routes
│   ├── globals.css          # Global styles and Tailwind directives
│   └── favicon.ico          # App favicon
├── assets/                   # Static assets (images, logos)
├── components/              # React components
│   ├── shared/              # Shared/common components
│   └── ui/                  # shadcn/ui components
├── i18n/                    # Internationalization config
│   ├── locales/             # Translation files
│   ├── navigation.ts        # i18n navigation helpers
│   ├── request.ts           # Server-side i18n
│   └── routing.ts           # Locale routing config
├── lib/                     # Utility functions and helpers
│   ├── fonts.ts             # Font configurations
│   └── utils.ts             # Common utilities (cn helper)
└── middleware.ts            # Next.js middleware (i18n routing)

public/                      # Public static files
```

## Key Routes

- `/` - Public showcase grid (approved projects only)
- `/[project-id]` - Individual project detail page
- `/admin` - Private admin review panel (password-protected)
- `/certificate/[cert-id]` - Public certificate verification page

## Conventions

### Routing

- All user-facing routes are under `app/[locale]/` for i18n support
- Use Next.js App Router conventions (layout.tsx, page.tsx, loading.tsx, etc.)
- Middleware handles locale detection and routing
- Public pages filter for `status: 'approved'` only

### Components

- UI components from shadcn/ui go in `components/ui/`
- Shared/reusable components go in `components/shared/`
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Project cards should be reusable components
- Media components must handle lazy loading and optimization

### Data & Backend

- All data stored in Supabase (shared with landing site)
- Use Supabase client for database queries and file uploads
- File URLs from Supabase storage buckets
- Email triggers via Brevo API on approval/rejection

### Media Guidelines

- Photos: Required, max 5MB, auto-resize and compress
- Videos: Optional, max 50MB or embed link, no autoplay
- Store in Supabase `uploads/` bucket
- Use optimized thumbnails for card views
- Lazy load images for performance

### Admin Features

- Review pending submissions (status: 'pending')
- Edit text before approval
- Approve → changes status to 'approved', generates certificate PDF, sends email
- Reject → keeps hidden, optionally sends rejection email
- Preview public page before approving

### Styling

- Tailwind utility classes for styling
- CSS variables for theming (defined in globals.css)
- Component variants using class-variance-authority
- Responsive design: mobile-first approach
- Support for RTL languages (future)

### Internationalization

- Translation files in `i18n/locales/[locale]/`
- Use next-intl hooks for translations in components
- Default locale: `en`, supported: `en`, `bn`
- Build with language file structure for easy expansion

### Imports

- Use `@/` path alias for imports from `src/`
- Organize imports (Biome handles this automatically)

### Code Style

- 2-space indentation
- Biome handles formatting and linting
- Follow recommended Next.js and React patterns

### Security & Privacy

- Never display church email or personal contact info publicly
- Validate file types and sizes on upload
- Admin routes must be protected
- Use environment variables for API keys (Supabase, Brevo)

# ICSA Features & Requirements

## Project Overview

ICSA (International Church Support Alliance) is a two-site platform connecting churches with potential supporters worldwide. This is a pilot project built with future scaling in mind.

**Domain Structure:**

- `icsa.church` - Landing/Join site (NOT part of this codebase)
- `voices.icsa.church` - Showcase site (THIS codebase)

**Current Codebase:** This repository is the **Showcase Site** only (voices.icsa.church)

## Core Features

### 1. Public Showcase Grid

**Route:** `/` (home page)

**Purpose:** Display all approved church projects as cards

**Features:**

- Grid layout of project cards
- Each card shows:
  - Church name
  - Country
  - Project title
  - Short mission description
  - Featured photo (optimized thumbnail)
  - Optional video indicator
- Click card to view full project details
- Lazy loading for images
- Responsive design (mobile-first)
- Fast loading (under 3 seconds on 4G)

**Data Rules:**

- Only shows projects with `status: 'approved'`
- Never displays church email or personal contact info
- Auto-updates when admin approves new projects

### 2. Project Detail Page

**Route:** `/[project-id]`

**Purpose:** Full story view for individual projects

**Features:**

- Full mission description
- High-quality photo display
- Video player (click-to-play, no autoplay)
  - Supports uploaded videos (max 50MB)
  - Supports YouTube/Vimeo embeds
- Church name and country
- Contact button/link (if provided)
- Certificate verification link (optional)

**Media Handling:**

- Photos: Lazy loaded, optimized
- Videos: Load only on user interaction
- All media from Supabase storage

### 3. Admin Review Dashboard

**Route:** `/admin`

**Purpose:** Private admin panel for reviewing and approving submissions

**Security:**

- Password-protected route
- Not accessible to public

**Features:**

#### Dashboard View

- List all pending projects (status: 'pending')
- Preview cards showing:
  - Thumbnail image
  - Church name
  - Country
  - Project title
  - Submission date
- Quick action buttons: Approve, Reject, View Details

#### Detail Review View

- Full project preview
- Edit capabilities:
  - Fix typos in text
  - Minor content adjustments
  - Cannot edit media (only approve/reject)
- Preview how it will look on public site
- Action buttons:
  - **Approve** - Publishes to public site
  - **Reject** - Keeps hidden, optional rejection reason
  - **Unpublish** - Hide previously approved project

#### Search & Filters (Nice-to-have)

- Filter by country
- Filter by status (pending/approved/rejected)
- Filter by date range
- Search by church name or project title

#### Bulk Actions (Nice-to-have)

- Select multiple projects
- Approve/reject in batch
- Export list

#### Internal Notes

- Add private admin notes to projects
- Not visible to churches or public
- Helps track review decisions

### 4. Certificate Verification Page

**Route:** `/certificate/[cert-id]`

**Purpose:** Public verification of church membership certificates

**Features:**

- Enter certificate ID or access via direct link
- Displays certificate details:
  - Church name
  - Project title
  - Certificate ID
  - Issue date
  - Verification status (valid/invalid)
- Link to view the church's public project page
- Download certificate PDF

**Security:**

- Public route (no authentication)
- Validates certificate ID against database
- Shows error for invalid/expired certificates

## Automated Workflows

### Approval Workflow

**Trigger:** Admin clicks "Approve" button

**Actions:**

1. Update project status: `pending` → `approved`
2. Generate PDF certificate with:
   - ICSA logo
   - Church name
   - Project title
   - Unique certificate ID
   - Approval date
   - Digital signature
3. Save certificate to Supabase `certificates/` bucket
4. Create certificate record in database
5. Send approval email via Brevo with:
   - Congratulations message
   - Link to public project page
   - Certificate PDF attachment or download link
6. Refresh public showcase (instant update, no cache delay)

### Rejection Workflow

**Trigger:** Admin clicks "Reject" button

**Actions:**

1. Update project status: `pending` → `rejected`
2. Optionally send rejection email via Brevo with:
   - Polite explanation
   - Guidance on resubmission (if applicable)
3. Keep project hidden from public view
4. Media files remain in storage but not publicly accessible

## Data Structure

### Database Tables (Supabase)

#### `churches` table

Stores basic church information from join form (managed by landing site)

- `id` (uuid, primary key)
- `church_name` (text)
- `contact_name` (text)
- `email` (text, private, unique - used as church identifier)
- `country` (text)
- `status` (enum: 'joined', 'submitted', 'pending', 'approved', 'rejected')
- `monthly_submission_count` (integer, default: 0)
- `last_submission_reset` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `projects` table

Stores mission stories and project details

- `id` (uuid, primary key)
- `church_id` (uuid, foreign key → churches.id)
- `project_title` (text)
- `mission_description` (text, long)
- `photo_url` (text, required)
- `video_url` (text, optional)
- `video_type` (enum: 'upload', 'youtube', 'vimeo', null)
- `contact_link` (text, optional)
- `status` (enum: 'pending', 'approved', 'rejected')
- `admin_notes` (text, private)
- `rejection_reason` (text, optional)
- `submitted_at` (timestamp)
- `approved_at` (timestamp, nullable)
- `approved_by` (text, admin identifier)
- `archived` (boolean, default: false)
- `archived_at` (timestamp, nullable)
- `deleted_by_church` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `certificates` table

Auto-generated certificate records

- `id` (uuid, primary key)
- `certificate_id` (text, unique, e.g., "CERT-2025-001234")
- `church_id` (uuid, foreign key → churches.id)
- `project_id` (uuid, foreign key → projects.id)
- `file_url` (text, PDF link)
- `issued_at` (timestamp)
- `created_at` (timestamp)

### File Storage (Supabase Buckets)

#### `uploads/` bucket

Stores church-uploaded media

- Photos: JPG, PNG, WebP (max 5MB)
- Videos: MP4, MOV, WebM (max 50MB)
- Auto-resize and compress photos
- Organize by church/project ID

#### `certificates/` bucket

Stores generated PDF certificates

- Auto-generated on approval
- Naming: `cert-{certificate_id}.pdf`
- Publicly accessible via unique link

## Project Submission Rules

### Church Identity & Profile Management

- **Church Identification:** Each church is uniquely identified by their email address
- **Consistent Profile:** The same email always connects to the same church profile
- **Private Link Access:** Churches access their profile via a unique private link (token-based)

### Project Limits

#### Active Project Limit
- **Maximum:** 5 active projects per church (approved + pending combined)
- **Enforcement:** Churches must archive or delete an existing project before adding a new one if at limit
- **Archived projects:** Do not count toward the active limit

#### Monthly Submission Limit
- **Maximum:** 3 new project submissions per month
- **Configurable:** This limit can be adjusted in the database configuration
- **Reset:** Counter resets automatically at the start of each month
- **Enforcement:** Churches cannot submit new projects if monthly limit is reached

### Project Management by Churches

#### Project Deletion/Archiving
- Churches can initiate deletion of their own projects via their private link
- **Implementation options:**
  1. **Soft delete (recommended):** Move project to archived state (`archived = true`)
  2. **Hard delete:** Fully remove record from database
- **Tracking:** System tracks if deletion was church-initiated (`deleted_by_church = true`)
- **Media files:** Remain in storage for archived projects (can be cleaned up later)

#### Validation Flow
1. Check if church has reached 5 active projects
2. Check if church has submitted 3 projects this month
3. If either limit is reached, show error with guidance
4. Suggest archiving old projects or waiting until next month

## Media Guidelines

### Photo Requirements

- **Required:** Yes (one main photo)
- **Max size:** 5MB
- **Formats:** JPG, PNG, WebP
- **Processing:**
  - Auto-resize for optimal display
  - Compress for web delivery
  - Generate thumbnail for card view
  - Lazy load on public pages

### Video Requirements

- **Required:** No (optional)
- **Options:**
  1. Upload video file (max 50MB, ~1 minute)
  2. Provide YouTube/Vimeo embed link
- **Formats (upload):** MP4, MOV, WebM
- **Display rules:**
  - No autoplay
  - Click-to-play only
  - Show on detail page only (not on cards)
  - Thumbnail preview for uploaded videos

### File Validation

- Check file type on upload
- Enforce size limits
- Scan for malicious content (if possible)
- Reject invalid files with clear error messages
- Validate project limits before allowing upload

## Email Integration (Brevo)

### Email Templates

#### 1. Welcome Email (NOT sent by this site)

Sent by landing site after join form submission

- Includes private link to project submission form

#### 2. Approval Email

**Trigger:** Admin approves project
**Recipient:** Church contact email
**Content:**

- Congratulations message
- Link to live public project page
- Certificate PDF attachment or download link
- ICSA logo and branding
  **Template ID:** Store in Brevo

#### 3. Rejection Email (Optional)

**Trigger:** Admin rejects project
**Recipient:** Church contact email
**Content:**

- Polite explanation
- Reason for rejection (if provided)
- Guidance on resubmission
- ICSA logo and branding
  **Template ID:** Store in Brevo

### Email Configuration

- API keys stored in environment variables
- Use Brevo transactional email API
- Simple HTML templates (not complex)
- All emails in English (for now)
- Include unsubscribe link (legal requirement)

## Internationalization (i18n)

### Current Implementation

- **Primary language:** English only
- All UI text, emails, and admin tools in English
- Translation files structured for future expansion

### Future-Ready Architecture

- Use `next-intl` for i18n routing
- Translation files in `i18n/locales/[locale]/`
- Support planned for:
  - Bengali (bn)
  - Arabic (ar) - RTL support
  - Additional languages as needed
- Text stored as replaceable labels (not hard-coded)
- Build with language file structure (e.g., en.json)

### Implementation Rules

- Never hard-code user-facing text
- Use translation keys for all labels
- Design UI to accommodate text expansion (some languages need more space)
- Plan for RTL layout support (Arabic, Hebrew)

## Security & Privacy

### Data Protection

- **Never display publicly:**
  - Church email addresses
  - Contact person names (unless explicitly provided for public display)
  - Admin notes
  - Rejection reasons
- **Private data access:**
  - Only admin can view pending submissions
  - Only admin can view church contact info

### File Security

- Validate all uploaded files (type, size)
- Store files in secure Supabase buckets
- Use signed URLs for private files
- Public files only for approved projects

### Admin Security

- Password-protected admin routes
- Environment variables for sensitive keys
- No admin credentials in code
- Session management for admin access

### API Security

- Supabase Row Level Security (RLS) policies
- API keys in environment variables only
- Rate limiting on public endpoints
- CORS configuration for allowed domains

## Performance Requirements

### Loading Speed

- Public pages load under 3 seconds on 4G
- Optimized images (WebP format preferred)
- Lazy loading for below-fold content
- Minimal JavaScript bundle size

### Optimization Strategies

- Next.js Image component for automatic optimization
- Static generation for public pages where possible
- Incremental Static Regeneration (ISR) for showcase grid
- CDN delivery via Vercel Edge Network

### Caching Strategy

- Public showcase: ISR with revalidation
- Project details: ISR with revalidation
- Admin pages: No caching (always fresh)
- Media files: Long-term cache with CDN

## Responsive Design

### Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Mobile-First Approach

- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Optimized images for mobile bandwidth

### Testing Requirements

- Test on real devices (iOS, Android)
- Test on various screen sizes
- Test landscape and portrait orientations
- Ensure forms work well on mobile keyboards

## Error Handling

### User-Facing Errors

- Clear, friendly error messages
- Guidance on how to fix issues
- No technical jargon
- Consistent error styling

### Error Pages

- 404: Page not found
- 500: Server error
- Custom error page for invalid certificates
- Offline/network error handling

### Admin Error Handling

- Validation errors on approval/rejection
- File upload errors with specific reasons
- Email sending failures with retry option
- Database connection errors

## Deployment & Hosting

### Platform

- **Hosting:** Vercel (recommended) or Netlify
- **Database:** Supabase (shared with landing site)
- **Email:** Brevo
- **Domain:** voices.icsa.church

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BREVO_API_KEY=
ADMIN_PASSWORD_HASH=
NEXT_PUBLIC_SITE_URL=https://voices.icsa.church
```

### Deployment Process

1. Test all flows locally
2. Deploy to staging environment
3. Test on staging with real data
4. Deploy to production
5. Verify DNS and SSL
6. Final smoke test on live domain

### DNS Configuration

- Point voices.icsa.church to Vercel
- Enable SSL/HTTPS
- Configure CDN for media delivery

## Launch Checklist

### Pre-Launch

- [ ] All features implemented and tested
- [ ] Supabase tables and buckets created
- [ ] Email templates configured in Brevo
- [ ] Environment variables set
- [ ] Admin password configured
- [ ] DNS records verified
- [ ] SSL certificates active

### Functionality Tests

- [ ] Public showcase displays approved projects
- [ ] Project detail pages load correctly
- [ ] Admin login works
- [ ] Admin can approve projects
- [ ] Approval triggers certificate generation
- [ ] Approval email sends with certificate
- [ ] Rejection workflow works
- [ ] Certificate verification page works
- [ ] Media uploads and displays correctly
- [ ] Mobile responsive on all pages

### Performance Tests

- [ ] Pages load under 3 seconds
- [ ] Images optimized and lazy loaded
- [ ] Videos click-to-play (no autoplay)
- [ ] No console errors
- [ ] Lighthouse score > 90

### Security Tests

- [ ] Admin routes password-protected
- [ ] Private data not exposed publicly
- [ ] File upload validation works
- [ ] API keys not in client code
- [ ] HTTPS enforced

### Final Steps

- [ ] Remove test data
- [ ] Verify all links work
- [ ] Check all email templates
- [ ] Team walkthrough completed
- [ ] Backup and restore tested
- [ ] Monitoring and logging configured

## Future Enhancements (Not in Scope)

These features are explicitly NOT included in the current project:

- ❌ Referral or invite system
- ❌ Payment or donation processing
- ❌ Permanent user accounts or passwords (except admin)
- ❌ Detailed analytics or marketing tools
- ❌ Mobile app
- ❌ Church registration form (handled by landing site)
- ❌ Social media integration
- ❌ Comments or reviews
- ❌ Search functionality for public users
- ❌ Project categories or tags
- ❌ Multi-admin roles and permissions

## Developer Notes

### Pilot Project Context

This system is a pilot for a larger platform planned later. Build with:

- Clean, maintainable code
- Scalable architecture
- Well-documented functions
- Reusable components
- Future expansion in mind

### Code Quality Standards

- TypeScript strict mode
- Biome for linting and formatting
- Component-based architecture
- Proper error handling
- Comprehensive comments for complex logic

### Testing Approach

- Manual testing for all user flows
- Test on multiple devices and browsers
- Test with real data (not just mock data)
- Test email delivery end-to-end
- Test file uploads with various formats and sizes

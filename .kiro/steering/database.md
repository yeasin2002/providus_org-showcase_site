# ICSA Database Schema & API Reference

## Database Overview

**Platform:** Supabase (PostgreSQL)
**Shared Database:** Same Supabase project used by both icsa.church (landing site) and voices.icsa.church (showcase site)

**This codebase (voices.icsa.church) responsibilities:**
- Read projects and churches data
- Update project status (pending → approved/rejected)
- Create certificate records
- Read/write media files to storage buckets

**Landing site (icsa.church) responsibilities:**
- Create church records
- Create project records
- Upload initial media files

---

## Database Tables

### Table: `churches`

Stores basic church information from the join form.

**Managed by:** Landing site (icsa.church)
**Access by showcase site:** Read-only (except status updates)

```sql
CREATE TABLE churches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'joined',
  token TEXT UNIQUE, -- Private link token for project submission
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_churches_status ON churches(status);
CREATE INDEX idx_churches_email ON churches(email);
CREATE INDEX idx_churches_token ON churches(token);
```

**Columns:**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | UUID | No | Primary key |
| `church_name` | TEXT | No | Official church name |
| `contact_name` | TEXT | No | Contact person name (private) |
| `email` | TEXT | No | Contact email (private, unique) |
| `country` | TEXT | No | Country name |
| `language` | TEXT | Yes | Preferred language (default: 'en') |
| `status` | TEXT | No | Current status (see Status Values) |
| `token` | TEXT | Yes | Unique token for project submission link |
| `token_expires_at` | TIMESTAMPTZ | Yes | Token expiration date |
| `created_at` | TIMESTAMPTZ | No | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | Last update timestamp |

**Status Values:**
- `joined` - Church submitted join form
- `submitted` - Church completed project submission
- `pending` - Project awaiting admin review
- `approved` - Project approved and public
- `rejected` - Project rejected

**Privacy Rules:**
- `email` and `contact_name` are PRIVATE - never display publicly
- Only admin can view these fields
- Public pages only show `church_name` and `country`

---

### Table: `projects`

Stores mission stories and project details submitted by churches.

**Managed by:** Landing site (creates), Showcase site (updates status, edits content)

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  project_title TEXT NOT NULL,
  mission_description TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  video_url TEXT,
  video_type TEXT CHECK (video_type IN ('upload', 'youtube', 'vimeo')),
  contact_link TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_church_id ON projects(church_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_approved_at ON projects(approved_at DESC);
CREATE INDEX idx_projects_submitted_at ON projects(submitted_at DESC);
```

**Columns:**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | UUID | No | Primary key |
| `church_id` | UUID | No | Foreign key to churches table |
| `project_title` | TEXT | No | Project/mission title |
| `mission_description` | TEXT | No | Full mission story (long text) |
| `photo_url` | TEXT | No | URL to main photo in Supabase storage |
| `video_url` | TEXT | Yes | URL to video or embed link |
| `video_type` | TEXT | Yes | Type: 'upload', 'youtube', or 'vimeo' |
| `contact_link` | TEXT | Yes | Optional contact URL or email |
| `status` | TEXT | No | Current status (see Status Values) |
| `admin_notes` | TEXT | Yes | Private admin notes (not visible to church) |
| `rejection_reason` | TEXT | Yes | Reason for rejection (if rejected) |
| `submitted_at` | TIMESTAMPTZ | Yes | When church submitted project |
| `approved_at` | TIMESTAMPTZ | Yes | When admin approved project |
| `approved_by` | TEXT | Yes | Admin identifier who approved |
| `created_at` | TIMESTAMPTZ | No | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | Last update timestamp |

**Status Values:**
- `pending` - Awaiting admin review
- `approved` - Approved and visible on public site
- `rejected` - Rejected and hidden from public

**Validation Rules:**
- `photo_url` is required (cannot be null)
- `video_url` is optional
- If `video_url` exists, `video_type` must be set
- `mission_description` should be at least 100 characters (frontend validation)
- `project_title` should be 10-200 characters

**Privacy Rules:**
- `admin_notes` and `rejection_reason` are PRIVATE
- Only admin can view/edit these fields
- Public pages never show these fields

---

### Table: `certificates`

Auto-generated certificate records created when projects are approved.

**Managed by:** Showcase site only

```sql
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id TEXT NOT NULL UNIQUE,
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE UNIQUE INDEX idx_certificates_cert_id ON certificates(certificate_id);
CREATE INDEX idx_certificates_church_id ON certificates(church_id);
CREATE INDEX idx_certificates_project_id ON certificates(project_id);
CREATE INDEX idx_certificates_issued_at ON certificates(issued_at DESC);
```

**Columns:**

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| `id` | UUID | No | Primary key |
| `certificate_id` | TEXT | No | Unique certificate ID (e.g., CERT-2025-000123) |
| `church_id` | UUID | No | Foreign key to churches table |
| `project_id` | UUID | No | Foreign key to projects table |
| `file_url` | TEXT | No | URL to PDF in Supabase storage |
| `issued_at` | TIMESTAMPTZ | No | Certificate issue date |
| `revoked` | BOOLEAN | No | Whether certificate is revoked (future feature) |
| `revoked_at` | TIMESTAMPTZ | Yes | When certificate was revoked |
| `revoked_reason` | TEXT | Yes | Reason for revocation |
| `created_at` | TIMESTAMPTZ | No | Record creation timestamp |

**Certificate ID Format:**
```
CERT-YYYY-NNNNNN
Example: CERT-2025-000123

YYYY = Year
NNNNNN = Sequential number (6 digits, zero-padded)
```

**Generation Logic:**
```typescript
async function generateCertificateId(): Promise<string> {
  const year = new Date().getFullYear();
  
  // Get the latest certificate for this year
  const { data } = await supabase
    .from('certificates')
    .select('certificate_id')
    .like('certificate_id', `CERT-${year}-%`)
    .order('certificate_id', { ascending: false })
    .limit(1);
  
  let nextNumber = 1;
  if (data && data.length > 0) {
    const lastId = data[0].certificate_id;
    const lastNumber = parseInt(lastId.split('-')[2]);
    nextNumber = lastNumber + 1;
  }
  
  const paddedNumber = nextNumber.toString().padStart(6, '0');
  return `CERT-${year}-${paddedNumber}`;
}
```

---

## Storage Buckets

### Bucket: `uploads`

Stores church-uploaded media files (photos and videos).

**Configuration:**
```javascript
{
  name: 'uploads',
  public: true, // Public access for approved projects
  fileSizeLimit: 52428800, // 50MB
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'video/webm'
  ]
}
```

**Folder Structure:**
```
uploads/
├── photos/
│   ├── {church_id}/
│   │   └── {project_id}/
│   │       ├── original.jpg
│   │       ├── optimized.webp
│   │       └── thumbnail.webp
│   └── ...
└── videos/
    ├── {church_id}/
    │   └── {project_id}/
    │       └── video.mp4
    └── ...
```

**File Naming Convention:**
```
photos/{church_id}/{project_id}/original.{ext}
photos/{church_id}/{project_id}/optimized.webp
photos/{church_id}/{project_id}/thumbnail.webp
videos/{church_id}/{project_id}/video.{ext}
```

**Access Rules:**
- Public read access for approved projects
- Upload access only via service role key
- Automatic cleanup for rejected projects (optional)

---

### Bucket: `certificates`

Stores auto-generated PDF certificates.

**Configuration:**
```javascript
{
  name: 'certificates',
  public: true, // Public access via unique URL
  fileSizeLimit: 5242880, // 5MB
  allowedMimeTypes: ['application/pdf']
}
```

**File Naming Convention:**
```
cert-{certificate_id}.pdf
Example: cert-CERT-2025-000123.pdf
```

**Access Rules:**
- Public read access (anyone with URL can download)
- Write access only via service role key
- No deletion (certificates are permanent records)

---

## Row Level Security (RLS) Policies

### Churches Table Policies

```sql
-- Enable RLS
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;

-- Public can only read approved churches (name and country only)
CREATE POLICY "Public read approved churches"
ON churches FOR SELECT
USING (status = 'approved');

-- Service role can do everything
CREATE POLICY "Service role full access"
ON churches FOR ALL
USING (auth.role() = 'service_role');
```

### Projects Table Policies

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can only read approved projects
CREATE POLICY "Public read approved projects"
ON projects FOR SELECT
USING (status = 'approved');

-- Service role can do everything
CREATE POLICY "Service role full access"
ON projects FOR ALL
USING (auth.role() = 'service_role');
```

### Certificates Table Policies

```sql
-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public can read all certificates (for verification)
CREATE POLICY "Public read certificates"
ON certificates FOR SELECT
USING (revoked = FALSE);

-- Service role can do everything
CREATE POLICY "Service role full access"
ON certificates FOR ALL
USING (auth.role() = 'service_role');
```

---

## Database Functions

### Function: Update Timestamp

Auto-update `updated_at` column on row changes.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to churches table
CREATE TRIGGER update_churches_updated_at
BEFORE UPDATE ON churches
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply to projects table
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### Function: Sync Church Status

Auto-update church status when project status changes.

```sql
CREATE OR REPLACE FUNCTION sync_church_status()
RETURNS TRIGGER AS $$
BEGIN
  -- When project is approved, update church status
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    UPDATE churches
    SET status = 'approved'
    WHERE id = NEW.church_id;
  END IF;
  
  -- When project is rejected, update church status
  IF NEW.status = 'rejected' AND OLD.status != 'rejected' THEN
    UPDATE churches
    SET status = 'rejected'
    WHERE id = NEW.church_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_church_status_trigger
AFTER UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION sync_church_status();
```

---

## API Queries

### Query: Get Approved Projects for Public Showcase

```typescript
const { data: projects, error } = await supabase
  .from('projects')
  .select(`
    id,
    project_title,
    mission_description,
    photo_url,
    video_url,
    video_type,
    contact_link,
    approved_at,
    churches (
      church_name,
      country
    )
  `)
  .eq('status', 'approved')
  .order('approved_at', { ascending: false });
```

### Query: Get Single Project Details

```typescript
const { data: project, error } = await supabase
  .from('projects')
  .select(`
    id,
    project_title,
    mission_description,
    photo_url,
    video_url,
    video_type,
    contact_link,
    approved_at,
    churches (
      church_name,
      country
    ),
    certificates (
      certificate_id,
      file_url
    )
  `)
  .eq('id', projectId)
  .eq('status', 'approved')
  .single();
```

### Query: Get Pending Projects for Admin

```typescript
const { data: projects, error } = await supabase
  .from('projects')
  .select(`
    id,
    project_title,
    mission_description,
    photo_url,
    video_url,
    video_type,
    contact_link,
    submitted_at,
    admin_notes,
    churches (
      id,
      church_name,
      contact_name,
      email,
      country
    )
  `)
  .eq('status', 'pending')
  .order('submitted_at', { ascending: true });
```

### Query: Approve Project

```typescript
const { data, error } = await supabase
  .from('projects')
  .update({
    status: 'approved',
    approved_at: new Date().toISOString(),
    approved_by: 'admin' // or admin identifier
  })
  .eq('id', projectId)
  .select()
  .single();
```

### Query: Create Certificate Record

```typescript
const { data, error } = await supabase
  .from('certificates')
  .insert({
    certificate_id: certificateId,
    church_id: churchId,
    project_id: projectId,
    file_url: pdfUrl,
    issued_at: new Date().toISOString()
  })
  .select()
  .single();
```

### Query: Verify Certificate

```typescript
const { data: certificate, error } = await supabase
  .from('certificates')
  .select(`
    id,
    certificate_id,
    file_url,
    issued_at,
    revoked,
    projects (
      project_title,
      churches (
        church_name,
        country
      )
    )
  `)
  .eq('certificate_id', certId)
  .eq('revoked', false)
  .single();
```

---

## Environment Variables

### Required for Database Access

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://voices.icsa.church

# Email Configuration (Brevo)
BREVO_API_KEY=your-brevo-api-key

# Admin Configuration
ADMIN_PASSWORD_HASH=your-hashed-password
```

### Supabase Client Setup

```typescript
// lib/supabase/client.ts (client-side)
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase/server.ts (server-side with service role)
import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
```

---

## Migration Scripts

### Initial Setup Script

```sql
-- Create churches table
CREATE TABLE IF NOT EXISTS churches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'joined',
  token TEXT UNIQUE,
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  project_title TEXT NOT NULL,
  mission_description TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  video_url TEXT,
  video_type TEXT CHECK (video_type IN ('upload', 'youtube', 'vimeo')),
  contact_link TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id TEXT NOT NULL UNIQUE,
  church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked BOOLEAN DEFAULT FALSE,
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_churches_status ON churches(status);
CREATE INDEX IF NOT EXISTS idx_churches_email ON churches(email);
CREATE INDEX IF NOT EXISTS idx_projects_church_id ON projects(church_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_approved_at ON projects(approved_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_cert_id ON certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_project_id ON certificates(project_id);

-- Enable RLS
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (see above)
```

---

## Backup & Maintenance

### Backup Strategy
- Supabase automatic daily backups
- Manual backup before major changes
- Export critical data weekly

### Maintenance Tasks
- Monitor database size
- Clean up orphaned files in storage
- Archive old rejected projects (optional)
- Review and optimize slow queries

### Performance Monitoring
- Track query execution times
- Monitor connection pool usage
- Set up alerts for slow queries
- Regular VACUUM and ANALYZE

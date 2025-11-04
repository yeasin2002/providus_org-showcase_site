# Supabase Integration - Project Upload Form

## Overview

The `useFormSubmission` hook now includes full Supabase integration for uploading files and storing project data.

## Features Implemented

### 1. File Upload to Supabase Storage

- **Main Photo**: Required, uploaded to `uploads/photos/{churchId}/`
- **Video**: Optional, uploaded to `uploads/videos/{churchId}/`
- **Additional Photos**: Optional, uploaded to `uploads/photos/{churchId}/additional/`

### 2. Database Integration

Projects are inserted into the `projects` table with the following fields:

```typescript
{
  church_id: string,
  project_name: string,
  short_description: string,
  main_photo_url: string,
  video_url: string | null,
  language: string,
  country: string,
  additional_photos: string[] | null,
  church_email: string,
  church_website: string | null,
  donation_link: string | null,
  status: 'pending'
}
```

### 3. Bot Prevention

All existing bot prevention features are maintained:
- Honeypot field validation
- Submission timing validation
- Math CAPTCHA validation
- Interaction count validation

## Usage

```typescript
const { handleSubmit, submitAttempted, timeWarning } = useFormSubmission({
  formLoadTime,
  mathQuestion,
  interactionCount,
  churchId: "church-uuid-here",
});
```

## File Upload Process

1. **Validate Files**: Check that required files are present
2. **Upload Main Photo**: Upload to Supabase storage
3. **Upload Video** (if provided): Upload to Supabase storage
4. **Upload Additional Photos** (if provided): Upload multiple files
5. **Get Public URLs**: Retrieve public URLs for all uploaded files
6. **Insert to Database**: Store project data with file URLs

## Error Handling

- File upload failures show user-friendly error messages
- Database insertion errors are caught and logged
- Failed submissions reset the form state for retry

## Storage Buckets Required

Make sure these buckets exist in your Supabase project:

- `uploads` - For photos and videos

### Bucket Structure

```
uploads/
├── photos/
│   └── {church_id}/
│       ├── {timestamp}-{random}.jpg
│       └── additional/
│           └── {timestamp}-{random}.jpg
└── videos/
    └── {church_id}/
        └── {timestamp}-{random}.mp4
```

## Database Schema

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_id UUID NOT NULL REFERENCES churches(id),
  project_name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  main_photo_url TEXT NOT NULL,
  video_url TEXT,
  language TEXT DEFAULT 'en',
  country TEXT NOT NULL,
  additional_photos TEXT[],
  church_email TEXT NOT NULL,
  church_website TEXT,
  donation_link TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Next Steps

1. **Create Storage Buckets**: Set up `uploads` bucket in Supabase
2. **Configure Bucket Policies**: Allow public read access for uploaded files
3. **Test Upload**: Try uploading a project with all file types
4. **Admin Review**: Implement admin panel to review pending projects

## Utility Functions

Additional utility functions are available in `src/utils/supabase-storage.ts`:

- `generateFileName()` - Generate unique file names
- `getStoragePath()` - Build storage paths
- `isValidImageType()` - Validate image file types
- `isValidVideoType()` - Validate video file types
- `formatFileSize()` - Format file sizes for display

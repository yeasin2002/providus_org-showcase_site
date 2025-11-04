# Form Submission Hook - Refactored Architecture

## Overview

The form submission logic has been refactored into multiple focused files for better readability and maintainability.

## File Structure

```
src/
├── hooks/
│   ├── useFormSubmission.ts          # Main submission hook (orchestrator)
│   └── useInteractionTracking.ts     # User interaction tracking
├── utils/
│   ├── supabase-upload.ts            # File upload utilities
│   ├── project-submission.ts         # Database insertion logic
│   └── upload-utils.ts               # Validation utilities
```

## Architecture

### 1. `useFormSubmission.ts` (Main Hook)

**Purpose**: Orchestrates the entire submission process

**Responsibilities**:
- Coordinate validation steps
- Manage submission state
- Call upload and database utilities
- Handle errors and user feedback

**Flow**:
1. Validate timing (bot prevention)
2. Validate math answer (CAPTCHA)
3. Validate interaction count (bot detection)
4. Upload main photo
5. Upload video (if provided)
6. Upload additional photos (if provided)
7. Insert project into database
8. Return success/error state

### 2. `supabase-upload.ts` (File Upload)

**Purpose**: Handle all file uploads to Supabase storage

**Functions**:
- `uploadFile()` - Upload single file
- `uploadMultipleFiles()` - Upload multiple files
- `getPhotoFolder()` - Get photo storage path
- `getVideoFolder()` - Get video storage path
- `getAdditionalPhotosFolder()` - Get additional photos path

**Storage Structure**:
```
uploads/
├── photos/{churchId}/
│   ├── {timestamp}-{random}.jpg
│   └── additional/
│       └── {timestamp}-{random}.jpg
└── videos/{churchId}/
    └── {timestamp}-{random}.mp4
```

### 3. `project-submission.ts` (Database)

**Purpose**: Handle database operations

**Functions**:
- `insertProject()` - Insert project record into database

**Database Fields**:
- `church_id` - UUID reference to churches table
- `project_name` - Project title
- `short_description` - Mission description
- `main_photo_url` - URL from storage
- `video_url` - URL from storage (optional)
- `additional_photos` - Array of URLs (optional)
- `church_email` - Contact email
- `church_website` - Website URL (optional)
- `donation_link` - Donation URL (optional)
- `language` - Default: "en"
- `country` - Selected country
- `status` - Default: "pending"

### 4. `upload-utils.ts` (Validation)

**Purpose**: Pure validation functions

**Functions**:
- `validateSubmissionTiming()` - Check submission speed
- `validateMathAnswer()` - Verify CAPTCHA answer
- `validateInteractionCount()` - Check user interactions
- `generateMathQuestion()` - Create math CAPTCHA

## Benefits of This Architecture

### ✅ Separation of Concerns
- Each file has a single, clear responsibility
- Easy to understand what each file does
- Changes in one area don't affect others

### ✅ Testability
- Pure functions are easy to unit test
- Upload logic can be tested independently
- Database logic can be mocked easily

### ✅ Reusability
- Upload functions can be used in other forms
- Validation functions can be shared
- Database functions can be extended

### ✅ Maintainability
- Clear code structure
- Well-documented functions
- Easy to add new features
- Simple to debug issues

### ✅ Readability
- Short, focused functions
- Clear function names
- Comprehensive comments
- Logical flow

## Usage Example

```typescript
import { useFormSubmission } from "@/hooks/useFormSubmission";

function MyForm() {
  const { handleSubmit, submitAttempted, timeWarning } = useFormSubmission({
    formLoadTime: Date.now(),
    mathQuestion: { question: "2 + 2", answer: 4 },
    interactionCount: 10,
    churchId: "church-uuid",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

## Error Handling

Each step includes proper error handling:

1. **Upload Errors**: Return null, show user-friendly message
2. **Database Errors**: Log error, show retry message
3. **Validation Errors**: Show specific validation message
4. **Network Errors**: Catch and display generic error

## Future Enhancements

- [ ] Add upload progress indicators
- [ ] Implement retry logic for failed uploads
- [ ] Add image optimization before upload
- [ ] Support for video thumbnails
- [ ] Batch upload optimization
- [ ] Upload cancellation support

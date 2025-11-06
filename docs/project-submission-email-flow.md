# Project Submission Email Flow

## Overview
This document describes the automated email confirmation flow that triggers when a church submits a new project through the upload form.

## Flow Diagram

```
User Submits Form
       ↓
Validation (timing, math, interactions)
       ↓
Upload Files (photo, video, additional photos)
       ↓
Insert Project to Database (status: "pending")
       ↓
Generate Email Template
       ↓
Send Confirmation Email
       ↓
Show Success Message
```

## Components Involved

### 1. Upload Page (`src/app/[locale]/upload/page.tsx`)
- Fetches church data from database
- Checks active project limits (5 max)
- Passes `churchName` and `churchId` to form component

### 2. Project Upload Form (`src/app/[locale]/upload/project-upload-form.tsx`)
- Collects project data from user
- Passes `churchName` to `useFormSubmission` hook
- Displays success/error states

### 3. Form Submission Hook (`src/hooks/useFormSubmission.ts`)
- Validates form data and user interactions
- Uploads files to Supabase storage
- Inserts project data to database
- **Generates and sends confirmation email**
- Handles errors gracefully

### 4. Project Submission Utility (`src/utils/project-submission.ts`)
- `insertProject()` - Saves project to database with status "pending"
- `generateProjectSubmissionEmail()` - Creates email payload with HTML and text versions

### 5. Email Template (`src/email/project-submitted-email.ts`)
- `generateProjectSubmittedEmail()` - Generates beautiful HTML email template
- Includes project details, next steps, and important information

### 6. Email Sending Hook (`src/hooks/useSendEmail.ts`)
- Sends email via `/api/email` endpoint
- Handles loading states and errors

## Email Content

### Subject
```
Project Submitted: [Project Name] - ICSA
```

### Key Sections
1. **Header** - Confirmation message with ICSA branding
2. **Greeting** - Personalized with church name
3. **Confirmation** - Project submission acknowledgment
4. **What Happens Next** - 3-step process explanation
   - Review Process (2-3 business days)
   - Approval Notification
   - Go Live on voices.icsa.church
5. **Project Details Summary** - Shows submitted information
6. **Important Information** - Project limits and review timeline
7. **Footer** - Contact information and support

### Email Formats
- **HTML Version** - Beautiful, responsive design with ICSA branding
- **Plain Text Version** - Fallback for email clients that don't support HTML

## Implementation Details

### Database Schema
```typescript
projects {
  id: UUID
  church_id: UUID
  project_name: TEXT
  short_description: TEXT
  main_photo_url: TEXT
  video_url: TEXT (nullable)
  additional_photos: TEXT[] (nullable)
  church_email: TEXT
  church_website: TEXT (nullable)
  donation_link: TEXT (nullable)
  status: TEXT (default: "pending")
  country: TEXT
  language: TEXT (default: "en")
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### Email Payload Structure
```typescript
{
  to: string,              // Church contact email
  subject: string,         // "Project Submitted: [Project Name] - ICSA"
  text: string,           // Plain text version
  html: string            // HTML version with styling
}
```

## Error Handling

### Email Sending Failures
- **Strategy**: Non-blocking - project submission succeeds even if email fails
- **Logging**: Errors logged to console for debugging
- **User Experience**: User sees success message (project is saved)
- **Recovery**: Admin can manually resend confirmation emails if needed

### Why Non-Blocking?
1. Project data is already saved to database
2. Email is a notification, not critical for submission
3. Better user experience (no confusing errors)
4. Admin can follow up manually if needed

## Testing Checklist

### Manual Testing
- [ ] Submit project with valid data
- [ ] Verify project saved to database with status "pending"
- [ ] Check email received at church contact email
- [ ] Verify email content displays correctly
- [ ] Test plain text version in email client
- [ ] Verify links in email work correctly
- [ ] Test with email sending failure (should still succeed)

### Edge Cases
- [ ] Email address invalid format
- [ ] Email service temporarily down
- [ ] Church name with special characters
- [ ] Project name with special characters
- [ ] Very long project descriptions

## Configuration

### Environment Variables Required
```env
# Email API (Brevo)
BREVO_API_KEY=your-brevo-api-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Email Service Setup
1. Create Brevo account
2. Get API key from Brevo dashboard
3. Add API key to environment variables
4. Configure email API route at `/api/email`

## Future Enhancements

### Potential Improvements
1. **Email Templates in Brevo** - Use Brevo's template system instead of inline HTML
2. **Email Tracking** - Track open rates and click-through rates
3. **Retry Logic** - Automatic retry for failed email sends
4. **Email Queue** - Queue emails for batch sending
5. **Personalization** - More personalized content based on church data
6. **Attachments** - Include project preview PDF
7. **Multi-language** - Send emails in church's preferred language

### Admin Features
1. **Resend Email** - Admin can manually resend confirmation emails
2. **Email History** - View all emails sent to a church
3. **Email Templates** - Admin can customize email templates
4. **Email Analytics** - Dashboard showing email delivery stats

## Support

### Common Issues

**Issue: Email not received**
- Check spam/junk folder
- Verify email address is correct
- Check Brevo API key is valid
- Review server logs for errors

**Issue: Email formatting broken**
- Test in multiple email clients
- Verify HTML is valid
- Check CSS inline styles
- Test plain text fallback

**Issue: Links not working**
- Verify base URL is correct
- Check certificate IDs are valid
- Test in different browsers

### Contact
For technical support or questions:
- Email: support@icsa.church
- Check server logs for detailed error messages
- Review Brevo dashboard for email delivery status

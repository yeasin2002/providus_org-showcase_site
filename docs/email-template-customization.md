# Email Template Customization Guide

## Quick Reference

### File Locations
- **Email Template**: `src/email/project-submitted-email.ts`
- **Email Generator**: `src/utils/project-submission.ts`
- **Email Hook**: `src/hooks/useSendEmail.ts`
- **Form Submission**: `src/hooks/useFormSubmission.ts`

## Customizing the Email Template

### 1. Update Email Subject

**File**: `src/utils/project-submission.ts`

```typescript
return {
  to: contactEmail,
  subject: `Project Submitted: ${projectName} - ICSA`, // ← Change this
  text: textContent,
  html: htmlContent,
};
```

### 2. Modify Email Colors

**File**: `src/email/project-submitted-email.ts`

```typescript
// Primary Colors
background: linear-gradient(135deg, #023C5E 0%, #034d73 100%); // Header background
border-top: 4px solid #D4AF37; // Gold accent
color: #F7F3E8; // Light text

// Secondary Colors
background-color: #F7F3E8; // Info box background
border-left: 4px solid #D4AF37; // Info box accent
color: #023C5E; // Dark text

// Status Badge
background-color: #FFF3CD; // Pending status background
color: #856404; // Pending status text
```

### 3. Update Email Content

#### Change Greeting
```typescript
const greeting = contactName ? `Dear ${contactName}` : `Dear ${churchName} Team`;
```

#### Modify Main Message
```typescript
<p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
  Thank you for submitting your project <strong>"${projectName}"</strong> from <strong>${churchName}</strong>!
</p>
```

#### Update Review Timeline
```typescript
<span style="color: #666666; font-size: 14px; line-height: 1.6;">
  Our team will review your project details, photos, and video to ensure everything meets our quality standards.
</span>
```

### 4. Add New Sections

#### Example: Add a Tips Section
```typescript
<!-- Tips Section -->
<div style="background-color: #E8F4F8; border-left: 4px solid #023C5E; padding: 20px; margin: 30px 0; border-radius: 4px;">
  <h3 style="margin: 0 0 15px 0; color: #023C5E; font-size: 16px; font-weight: bold;">
    💡 Tips for Success:
  </h3>
  <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
    <li>High-quality photos get more attention</li>
    <li>Clear descriptions help donors understand your mission</li>
    <li>Videos increase engagement by 80%</li>
  </ul>
</div>
```

### 5. Customize Footer

```typescript
<p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6;">
  © ${new Date().getFullYear()} International Church Support Alliance<br>
  Building bridges between churches and supporters worldwide
</p>
```

## Email Variables Available

### From Project Data
```typescript
{
  churchName: string,      // Church name
  projectName: string,     // Project title
  contactEmail: string,    // Church contact email
  contactName?: string     // Optional contact person name
}
```

### Auto-Generated
```typescript
{
  submissionDate: Date,    // Current date/time
  year: number,           // Current year
  certificateId: string   // (for approval emails)
}
```

## Creating New Email Templates

### 1. Create Template File

**File**: `src/email/your-new-email.ts`

```typescript
interface YourEmailParams {
  churchName: string;
  // Add your parameters
}

export const generateYourEmail = ({
  churchName,
}: YourEmailParams): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Email Title</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <!-- Your email content here -->
</body>
</html>
  `.trim();
};
```

### 2. Create Email Generator Function

**File**: `src/utils/your-email-generator.ts`

```typescript
import { generateYourEmail } from "@/email/your-new-email";

export function generateYourEmailPayload(
  churchName: string,
  recipientEmail: string,
) {
  const htmlContent = generateYourEmail({ churchName });
  
  const textContent = `
Plain text version of your email
  `.trim();

  return {
    to: recipientEmail,
    subject: "Your Email Subject",
    text: textContent,
    html: htmlContent,
  };
}
```

### 3. Use in Your Code

```typescript
import { generateYourEmailPayload } from "@/utils/your-email-generator";

// Send email
const emailPayload = generateYourEmailPayload(churchName, email);

const response = await fetch("/api/email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(emailPayload),
});
```

## Email Design Best Practices

### 1. Inline CSS
Always use inline styles - many email clients strip `<style>` tags:
```html
<!-- ✅ Good -->
<p style="color: #333; font-size: 16px;">Text</p>

<!-- ❌ Bad -->
<style>.text { color: #333; }</style>
<p class="text">Text</p>
```

### 2. Table-Based Layout
Use tables for layout - better email client support:
```html
<table role="presentation" style="width: 100%;">
  <tr>
    <td>Content</td>
  </tr>
</table>
```

### 3. Responsive Design
Use max-width for mobile compatibility:
```html
<table style="width: 100%; max-width: 600px;">
  <!-- Content -->
</table>
```

### 4. Alt Text for Images
Always include alt text:
```html
<img src="logo.png" alt="ICSA Logo" style="width: 150px;" />
```

### 5. Plain Text Fallback
Always provide a plain text version for accessibility and email clients that don't support HTML.

## Testing Your Email Templates

### 1. Local Testing
```typescript
// Create a test file
const testEmail = generateProjectSubmittedEmail({
  churchName: "Test Church",
  projectName: "Test Project",
  contactName: "John Doe",
});

console.log(testEmail);
```

### 2. Email Client Testing
Test in multiple email clients:
- Gmail (web, mobile)
- Outlook (desktop, web)
- Apple Mail
- Yahoo Mail
- Mobile devices (iOS, Android)

### 3. Tools
- [Litmus](https://litmus.com/) - Email testing platform
- [Email on Acid](https://www.emailonacid.com/) - Email preview tool
- [Mailtrap](https://mailtrap.io/) - Email testing service

## Common Customizations

### Change Review Timeline
```typescript
// From 2-3 days to 1-2 days
<span style="color: #666666; font-size: 14px; line-height: 1.6;">
  Our team will review your project within 1-2 business days.
</span>
```

### Add Social Media Links
```html
<div style="text-align: center; margin: 20px 0;">
  <a href="https://facebook.com/icsa" style="margin: 0 10px;">
    <img src="facebook-icon.png" alt="Facebook" style="width: 32px;" />
  </a>
  <a href="https://twitter.com/icsa" style="margin: 0 10px;">
    <img src="twitter-icon.png" alt="Twitter" style="width: 32px;" />
  </a>
</div>
```

### Include Church Logo
```html
<div style="text-align: center; margin: 20px 0;">
  <img src="${churchLogoUrl}" alt="${churchName} Logo" style="max-width: 150px; height: auto;" />
</div>
```

### Add Call-to-Action Button
```html
<table role="presentation" style="width: 100%; margin: 30px 0;">
  <tr>
    <td align="center">
      <a href="${actionUrl}" 
         style="display: inline-block; background: #D4AF37; color: #023C5E; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold;">
        View Your Dashboard →
      </a>
    </td>
  </tr>
</table>
```

## Troubleshooting

### Email Not Rendering Correctly
1. Check inline styles are applied
2. Verify table structure is correct
3. Test in multiple email clients
4. Validate HTML syntax

### Images Not Showing
1. Use absolute URLs (not relative)
2. Host images on CDN
3. Include alt text
4. Check image permissions

### Links Not Working
1. Use full URLs with https://
2. Test links before sending
3. Avoid URL shorteners
4. Check for typos

## Resources

- [Email Design Guide](https://www.campaignmonitor.com/dev-resources/guides/design/)
- [HTML Email Best Practices](https://www.smashingmagazine.com/2021/04/complete-guide-html-email-templates-tools/)
- [Email Client CSS Support](https://www.caniemail.com/)

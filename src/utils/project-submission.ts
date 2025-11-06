import { generateProjectSubmittedEmail } from "@/email/project-submitted-email";
import { createClient } from "@/utils/supabase/client";
import type { ProjectFormData } from "../app/[locale]/upload/types";

/**
 * Insert project data into Supabase database
 * @param churchId - The church UUID
 * @param formData - The form data from the user
 * @param mainPhotoUrl - URL of the uploaded main photo
 * @param videoUrl - URL of the uploaded video (optional)
 * @param additionalPhotosUrls - Array of URLs for additional photos (optional)
 * @returns The created project data or null if failed
 */
export async function insertProject(
  churchId: string,
  formData: ProjectFormData,
  mainPhotoUrl: string,
  videoUrl: string | null,
  additionalPhotosUrls: string[]
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      church_id: churchId,
      project_name: formData.projectName,
      short_description: formData.description,
      main_photo_url: mainPhotoUrl,
      video_url: videoUrl,
      language: "en", // Default to English
      country: formData.country,
      additional_photos:
        additionalPhotosUrls.length > 0 ? additionalPhotosUrls : null,
      church_email: formData.contactEmail,
      church_website: formData.website || null,
      donation_link: formData.donationLink || null,
      status: "pending", // Pending admin review
    })
    .select()
    .single();

  if (error) {
    console.error("Database insert error:", error);
    return null;
  }

  return data;
}

/**
 * Generate project submission confirmation email
 * @param churchName - Name of the church
 * @param projectName - Name of the submitted project
 * @param contactEmail - Email address to send confirmation to
 * @param contactName - Optional contact person name
 * @returns Email payload ready to be sent
 */
export function generateProjectSubmissionEmail(
  churchName: string,
  projectName: string,
  contactEmail: string,
  contactName?: string
) {
  const htmlContent = generateProjectSubmittedEmail({
    churchName,
    projectName,
    contactName,
  });

  // Plain text version for email clients that don't support HTML
  const textContent = `
Dear ${contactName || `${churchName} Team`},

Thank you for submitting your project "${projectName}" from ${churchName}!

We've received your submission and our team is now reviewing it. This typically takes 2-3 business days.

WHAT HAPPENS NEXT?

1. Review Process
   Our team will review your project details, photos, and video to ensure everything meets our quality standards.

2. Approval Notification
   Once approved, you'll receive an email with a link to your live project page and your ICSA membership certificate.

3. Go Live!
   Your project will be featured on voices.icsa.church where supporters worldwide can discover and connect with you.

SUBMITTED PROJECT DETAILS:
- Church: ${churchName}
- Project: ${projectName}
- Status: Pending Review
- Submitted: ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}

IMPORTANT INFORMATION:
- Review Time: Typically 2-3 business days
- Project Limit: You can have up to 5 active projects (approved + pending)
- Monthly Limit: Maximum 3 new project submissions per month
- Updates: You'll receive an email once your project is reviewed

If you have any questions or need to make changes to your submission, please contact us at support@icsa.church.

Thank you for being part of the ICSA community!

---
© ${new Date().getFullYear()} International Church Support Alliance
Building bridges between churches and supporters worldwide
  `.trim();

  return {
    to: contactEmail,
    subject: `Project Submitted: ${projectName} - ICSA`,
    text: textContent,
    html: htmlContent,
  };
}

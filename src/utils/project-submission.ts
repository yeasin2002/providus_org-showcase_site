import { generateProjectSubmittedEmailText } from "@/email/generateProjectSubmittedEmail-text.email";
import { createClient } from "@/utils/supabase/client";
import type { ProjectFormData } from "../app/[locale]/upload/types";

/**
 * Insert project data into Supabase database
 * @param churchId - The church UUID
 * @param formData - The form data from the user
 * @param mainPhotoUrl - URL of the uploaded main photo
 * @param videoUrl - URL of the uploaded video (optional)
 * @param additionalPhotoUrl - URL for additional photo (optional)
 * @returns The created project data or null if failed
 */
export async function insertProject(
  churchId: string,
  formData: ProjectFormData,
  mainPhotoUrl: string,
  videoUrl: string | null,
  additionalPhotoUrl: string | null
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
      additional_photo: additionalPhotoUrl,
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
  const textContent = generateProjectSubmittedEmailText({
    churchName,
    projectName,
    contactName,
  });

  return {
    to: contactEmail,
    subject: `Project Submitted: ${projectName} - ICSA`,
    text: textContent,
  };
}

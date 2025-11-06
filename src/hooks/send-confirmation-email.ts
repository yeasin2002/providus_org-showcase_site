import type { ProjectFormData } from "@/app/[locale]/upload/types";
import { generateProjectSubmissionEmail } from "@/utils/project-submission";

interface SendConfirmationEmailProps {
  churchName: string;
  data: ProjectFormData;
  contact_email: string;
}

export const sendConfirmationEmail = async ({
  churchName,
  data,
  contact_email,
}: SendConfirmationEmailProps) => {
  try {
    const emailPayload = generateProjectSubmissionEmail(
      churchName,
      data.projectName,
      contact_email
    );

    // Send email via API
    const emailResponse = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      console.error(
        "Failed to send confirmation email:",
        await emailResponse.text()
      );
      // Don't fail the submission if email fails - project is already saved
    } else {
      console.log("Confirmation email sent successfully");
    }
  } catch (emailError) {
    console.error("Error sending confirmation email:", emailError);
    // Don't fail the submission if email fails - project is already saved
  }
};

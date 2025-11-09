interface ProjectSubmittedEmailParams {
  churchName: string;
  projectName: string;
  contactName?: string;
}

export const generateProjectSubmittedEmailText = ({
  churchName,
  projectName,
  contactName,
}: ProjectSubmittedEmailParams): string => {
  const greeting = contactName
    ? `Dear ${contactName}`
    : `Dear ${churchName} Team`;

  return `
${greeting},

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
};

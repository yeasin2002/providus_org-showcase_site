interface ProjectSubmittedEmailParams {
  churchName: string;
  projectName: string;
  contactName?: string;
}

export const generateProjectSubmittedEmail = ({
  churchName,
  projectName,
  contactName,
}: ProjectSubmittedEmailParams): string => {
  const greeting = contactName ? `Dear ${contactName}` : `Dear ${churchName} Team`;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Submitted Successfully</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Gold Border -->
          <tr>
            <td style="background: linear-gradient(135deg, #023C5E 0%, #034d73 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; border-top: 4px solid #D4AF37;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 1px;">
                Project Submitted! ✅
              </h1>
              <p style="margin: 10px 0 0 0; color: #F7F3E8; font-size: 16px;">
                Your story is under review
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 18px; line-height: 1.6;">
                ${greeting},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Thank you for submitting your project <strong>"${projectName}"</strong> from <strong>${churchName}</strong>!
              </p>

              <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                We've received your submission and our team is now reviewing it. This typically takes 2-3 business days.
              </p>

              <!-- Status Box -->
              <div style="background-color: #F7F3E8; border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px 0; color: #023C5E; font-size: 20px; font-weight: bold;">
                  📋 What Happens Next?
                </h2>
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #D4AF37; font-size: 18px; margin-right: 10px;">1️⃣</span>
                      <span style="color: #333333; font-size: 15px; font-weight: bold;">Review Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 0 15px 28px;">
                      <span style="color: #666666; font-size: 14px; line-height: 1.6;">
                        Our team will review your project details, photos, and video to ensure everything meets our quality standards.
                      </span>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #D4AF37; font-size: 18px; margin-right: 10px;">2️⃣</span>
                      <span style="color: #333333; font-size: 15px; font-weight: bold;">Approval Notification</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 0 15px 28px;">
                      <span style="color: #666666; font-size: 14px; line-height: 1.6;">
                        Once approved, you'll receive an email with a link to your live project page and your ICSA membership certificate.
                      </span>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 8px 0;">
                      <span style="color: #D4AF37; font-size: 18px; margin-right: 10px;">3️⃣</span>
                      <span style="color: #333333; font-size: 15px; font-weight: bold;">Go Live!</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 0 0 28px;">
                      <span style="color: #666666; font-size: 14px; line-height: 1.6;">
                        Your project will be featured on voices.icsa.church where supporters worldwide can discover and connect with you.
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Project Details Summary -->
              <div style="background-color: #f9f9f9; padding: 20px; margin: 30px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
                <h3 style="margin: 0 0 15px 0; color: #023C5E; font-size: 16px; font-weight: bold;">
                  📝 Submitted Project Details:
                </h3>
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="padding: 5px 0; color: #666666; font-size: 14px; width: 120px;">
                      <strong>Church:</strong>
                    </td>
                    <td style="padding: 5px 0; color: #333333; font-size: 14px;">
                      ${churchName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #666666; font-size: 14px;">
                      <strong>Project:</strong>
                    </td>
                    <td style="padding: 5px 0; color: #333333; font-size: 14px;">
                      ${projectName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #666666; font-size: 14px;">
                      <strong>Status:</strong>
                    </td>
                    <td style="padding: 5px 0;">
                      <span style="background-color: #FFF3CD; color: #856404; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: bold;">
                        ⏳ Pending Review
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #666666; font-size: 14px;">
                      <strong>Submitted:</strong>
                    </td>
                    <td style="padding: 5px 0; color: #333333; font-size: 14px;">
                      ${new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Important Notes -->
              <div style="background-color: #E8F4F8; border-left: 4px solid #023C5E; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px 0; color: #023C5E; font-size: 16px; font-weight: bold;">
                  💡 Important Information:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
                  <li><strong>Review Time:</strong> Typically 2-3 business days</li>
                  <li><strong>Project Limit:</strong> You can have up to 5 active projects (approved + pending)</li>
                  <li><strong>Monthly Limit:</strong> Maximum 3 new project submissions per month</li>
                  <li><strong>Updates:</strong> You'll receive an email once your project is reviewed</li>
                </ul>
              </div>

              <p style="margin: 30px 0 0 0; color: #555555; font-size: 15px; line-height: 1.6;">
                If you have any questions or need to make changes to your submission, please don't hesitate to contact us.
              </p>

              <p style="margin: 20px 0 0 0; color: #333333; font-size: 15px; line-height: 1.6;">
                Thank you for being part of the ICSA community! 🙏
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                Need help or have questions?
              </p>
              <p style="margin: 0 0 20px 0; color: #023C5E; font-size: 14px;">
                Contact us at <a href="mailto:support@icsa.church" style="color: #023C5E; text-decoration: none; font-weight: bold;">support@icsa.church</a>
              </p>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6;">
                  © ${new Date().getFullYear()} International Church Support Alliance<br>
                  Building bridges between churches and supporters worldwide
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

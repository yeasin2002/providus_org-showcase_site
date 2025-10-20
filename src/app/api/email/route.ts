import { NextResponse } from "next/server";

const apiKey = process.env.BREVO_API_KEY as string;
const senderEmail = process.env.BREVO_SENDER_EMAIL as string;
const senderName = process.env.BREVO_SENDER_NAME as string;

// Basic reusable Brevo email sender
async function sendBrevoEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return await res.json();
}

// POST /api/email
// Example body: { to: "user@example.com", subject: "Hello", text: "Welcome" }
export async function POST(req: Request) {
  try {
    const { to, subject, text, html } = await req.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sendBrevoEmail({ to, subject, text, html });
    return NextResponse.json({ success: true, response });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

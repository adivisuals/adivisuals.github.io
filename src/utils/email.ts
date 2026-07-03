import emailjs from "@emailjs/browser";

/**
 * EmailJS configuration is read from Vite environment variables so that no
 * keys are committed to the repository. Set them in a local `.env` file or as
 * GitHub repository secrets for CI builds:
 *
 *   VITE_EMAILJS_SERVICE_ID=...
 *   VITE_EMAILJS_TEMPLATE_ID=...
 *   VITE_EMAILJS_PUBLIC_KEY=...
 *
 * The EmailJS public key is intentionally public; protection comes from the
 * EmailJS dashboard settings (Allowed Origins, rate limits, optional captcha).
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

export const isEmailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface SendResult {
  status: number;
  text: string;
}

/** Send a contact-form submission through EmailJS. */
export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  if (!isEmailjsConfigured) {
    throw new Error("EmailJS is not configured.");
  }

  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: fullName,
      first_name: payload.firstName,
      last_name: payload.lastName,
      reply_to: payload.email,
      email: payload.email,
      subject: payload.subject || "(No subject)",
      message: payload.message,
    },
    { publicKey: PUBLIC_KEY }
  );

  return { status: response.status, text: response.text };
}

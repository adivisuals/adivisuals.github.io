/**
 * Lightweight client-side input sanitization helpers.
 *
 * NOTE: Client-side checks improve UX and filter casual abuse, but are NOT a
 * security boundary on their own. EmailJS server-side limits (allowed origins,
 * rate limits) and your email provider's filtering are the real protection.
 */

export const LIMITS = {
  name: 60,
  email: 120,
  subject: 120,
  message: 2000,
} as const;

/** Strip control characters and enforce a max length. */
export function sanitizeText(input: string, max: number): string {
  return input.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

/** RFC-5322-ish practical email validation with length cap. */
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > LIMITS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

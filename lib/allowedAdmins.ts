const ALLOWED_EMAILS = (process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!ALLOWED_EMAILS.length) return true;
  return ALLOWED_EMAILS.includes((email || "").toLowerCase());
}

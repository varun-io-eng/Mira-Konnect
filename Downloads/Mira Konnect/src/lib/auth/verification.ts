import { randomBytes } from "crypto";

/** Generate a random verification token */
export function generateVerificationToken(): string {
  return randomBytes(32).toString("hex");
}

/** Create a verification URL for the user */
export function createVerificationUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${baseUrl}/verify-email?token=${token}`;
}

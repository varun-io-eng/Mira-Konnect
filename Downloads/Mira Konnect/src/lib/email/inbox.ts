import { siteConfig } from "@/lib/site-config";

/** Inbox for contact form, job applications, and other site notifications */
export function getNotificationInbox(): string {
  const fromEnv = process.env.NOTIFICATION_INBOX?.trim();
  if (fromEnv) return fromEnv;
  return siteConfig.contact.email;
}

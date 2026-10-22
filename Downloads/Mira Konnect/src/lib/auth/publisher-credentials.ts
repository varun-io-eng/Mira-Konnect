/** Sole publisher account for the job portal (seed + login). Override in production via env. */
export const DEFAULT_PUBLISHER_EMAIL = "admin@gmail.com";

/** Default password when ADMIN_PUBLISH_PASSWORD is not set — change in .env for production. */
export const DEFAULT_PUBLISHER_PASSWORD = "MiraKonnectPublish2026!";

export function getPublisherEmail() {
  return (process.env.ADMIN_PUBLISH_EMAIL ?? DEFAULT_PUBLISHER_EMAIL).toLowerCase();
}

export function getPublisherPassword() {
  return process.env.ADMIN_PUBLISH_PASSWORD ?? DEFAULT_PUBLISHER_PASSWORD;
}

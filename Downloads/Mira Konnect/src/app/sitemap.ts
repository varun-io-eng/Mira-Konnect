import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/industries",
  "/jobs",
  "/for-employers",
  "/for-job-seekers",
  "/how-we-work",
  "/contact",
  "/blog",
  "/faq",
  "/privacy-policy",
  "/terms-and-conditions",
  "/recruitment-services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/jobs" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}

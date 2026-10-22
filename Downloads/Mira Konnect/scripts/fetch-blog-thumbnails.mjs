/**
 * Blog-only thumbnails (not used elsewhere on the site). Run: node scripts/fetch-blog-thumbnails.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "blog");

const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&h=788&q=88`;

const files = [
  ["01-recruitment-process.jpg", u("photo-1507679799987-c73779587ccf")],
  ["02-resume-writing.jpg", u("photo-1629909613654-28e377c37b09")],
  ["03-interview-tips.jpg", u("photo-1542744173-8e7e53415bb0")],
  ["04-skills-based-hiring.jpg", u("photo-1553877522-43269d4ea984")],
  ["05-online-interview.jpg", u("photo-1560250097-0b93528c311a")],
  ["06-inhouse-vs-agency.jpg", u("photo-1600880292089-90a7e086ee0c")],
  ["07-it-hiring.jpg", u("photo-1611224923853-80b023f02d71")],
  ["08-manufacturing-recruitment.jpg", u("photo-1633265486064-086b219458ec")],
  ["09-candidate-experience.jpg", u("photo-1486312338219-ce68d2c6f44d")],
  ["10-ai-recruitment.jpg", u("photo-1521791136064-7986c2920216")],
];

fs.mkdirSync(outDir, { recursive: true });

for (const [name, url] of files) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  fs.writeFileSync(path.join(outDir, name), Buffer.from(await res.arrayBuffer()));
  console.log("wrote", name);
}

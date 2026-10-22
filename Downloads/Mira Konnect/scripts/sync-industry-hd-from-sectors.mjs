/**
 * Copy sector HD pairs into public/images/industries/hd/ and refresh home card JPGs.
 * Run after npm run images:industries OR when sectors/ is already populated.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sectorsDir = path.join(root, "public", "images", "industries", "sectors");
const hdDir = path.join(root, "public", "images", "industries", "hd");
const homeDir = path.join(root, "public", "images", "industries", "home");

const slugs = [
  "pharmaceuticals-lifesciences",
  "manufacturing-engineering",
  "hospitality",
  "it",
  "gems-jewellery",
  "textiles",
  "banking-insurance",
  "edtech",
  "digital-marketing",
  "fmcg",
];

fs.mkdirSync(hdDir, { recursive: true });

for (const slug of slugs) {
  const aSrc = path.join(sectorsDir, `${slug}-a.jpg`);
  const bSrc = path.join(sectorsDir, `${slug}-b.jpg`);
  const aDest = path.join(hdDir, `${slug}-a.jpg`);
  const bDest = path.join(hdDir, `${slug}-b.jpg`);
  const homeDest = path.join(homeDir, `${slug}.jpg`);

  if (!fs.existsSync(aSrc) || !fs.existsSync(bSrc)) {
    console.warn("skip (missing):", slug);
    continue;
  }
  fs.copyFileSync(aSrc, aDest);
  fs.copyFileSync(bSrc, bDest);
  fs.copyFileSync(aSrc, homeDest);
  console.log("synced", slug);
}

console.log("Done — hd/ and home/*.jpg updated from sectors/");

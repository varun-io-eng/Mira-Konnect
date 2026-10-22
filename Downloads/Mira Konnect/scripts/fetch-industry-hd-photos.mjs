/**
 * Download verified Unsplash photos into public/images/industries/hd/.
 * Missing pairs fall back to public/images/industries/sectors/.
 * Run: npm run images:industries-hd
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sectorsDir = path.join(root, "public", "images", "industries", "sectors");
const hdDir = path.join(root, "public", "images", "industries", "hd");
const homeDir = path.join(root, "public", "images", "industries", "home");

const unsplash = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=92`;

/** IDs verified HTTP 200 against images.unsplash.com */
const sectors = [
  {
    slug: "pharmaceuticals-lifesciences",
    a: unsplash("photo-1576091160399-112ba8d25d1d"),
    b: unsplash("photo-1532187863486-abf9dbad1b69"),
  },
  {
    slug: "manufacturing-engineering",
    a: unsplash("photo-1581091226825-a6a2a5aee158"),
    b: unsplash("photo-1573164713714-d95e436ab8d6"),
  },
  {
    slug: "hospitality",
    a: unsplash("photo-1542314831-068cd1dbfeeb"),
    b: unsplash("photo-1423666639041-f56000c27a9a"),
  },
  {
    slug: "it",
    a: unsplash("photo-1497366216548-37526070297c"),
    b: unsplash("photo-1522071820081-009f0129c71c"),
  },
  {
    slug: "gems-jewellery",
    a: unsplash("photo-1611591437281-460bfbe1220a"),
    b: unsplash("photo-1454165804606-c3d57bc86b40"),
  },
  {
    slug: "textiles",
    a: unsplash("photo-1497366811353-6870744d04b2"),
    b: unsplash("photo-1573164713714-d95e436ab8d6"),
  },
  {
    slug: "banking-insurance",
    a: unsplash("photo-1454165804606-c3d57bc86b40"),
    b: unsplash("photo-1554224155-6726b3ff858f"),
  },
  {
    slug: "edtech",
    a: unsplash("photo-1497366811353-6870744d04b2"),
    b: unsplash("photo-1522071820081-009f0129c71c"),
  },
  {
    slug: "digital-marketing",
    a: unsplash("photo-1460925895917-afdab827c52f"),
    b: unsplash("photo-1497366216548-37526070297c"),
  },
  {
    slug: "fmcg",
    a: unsplash("photo-1441986300917-64674bd600d8"),
    b: unsplash("photo-1423666639041-f56000c27a9a"),
  },
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

function copySector(slug, which, dest) {
  const src = path.join(sectorsDir, `${slug}-${which}.jpg`);
  if (!fs.existsSync(src)) return false;
  fs.copyFileSync(src, dest);
  return true;
}

fs.mkdirSync(hdDir, { recursive: true });
fs.mkdirSync(homeDir, { recursive: true });

for (const { slug, a, b } of sectors) {
  const aPath = path.join(hdDir, `${slug}-a.jpg`);
  const bPath = path.join(hdDir, `${slug}-b.jpg`);
  const homePath = path.join(homeDir, `${slug}.jpg`);

  for (const [url, dest, which] of [
    [a, aPath, "a"],
    [b, bPath, "b"],
  ]) {
    try {
      await download(url, dest);
    } catch (e) {
      console.warn(`${slug}-${which}: ${e.message}, using sectors/`);
      if (!copySector(slug, which, dest)) {
        throw new Error(`No image for ${slug}-${which}`);
      }
    }
  }
  fs.copyFileSync(aPath, homePath);
  console.log("ok", slug);
}

console.log("Done — public/images/industries/hd/");

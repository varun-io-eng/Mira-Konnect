/**
 * Knock out near-black background from mira-konnect-logo.png (transparent PNG).
 * Run: node scripts/prepare-brand-logo.mjs [input.png]
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultIn = path.join(root, "public", "images", "brand", "mira-konnect-logo-source.png");
const out = path.join(root, "public", "images", "brand", "mira-konnect-logo.png");

const input = process.argv[2] ? path.resolve(process.argv[2]) : defaultIn;

function knockOutDarkBackground(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const lum = (r + g + b) / 3;
    if (max < 28 || lum < 22) {
      data[i + 3] = 0;
    } else if (max < 45 && lum < 40) {
      data[i + 3] = Math.min(data[i + 3], 80);
    }
  }
}

if (!fs.existsSync(input)) {
  console.error("Missing input:", input);
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
knockOutDarkBackground(data, info.channels);

const trimmed = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .trim({ threshold: 10 })
  .png()
  .toBuffer();

await sharp(trimmed).toFile(out);
const meta = await sharp(trimmed).metadata();
console.log("Wrote", out, `${meta.width}x${meta.height}`);

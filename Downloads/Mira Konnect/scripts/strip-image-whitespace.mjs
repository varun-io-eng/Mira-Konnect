import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const COMPOSITE = path.resolve(
  "C:/Users/User/.cursor/projects/c-Users-User-Downloads-Mira-Konnect/assets/c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_b15f86476268fe601f98c4c0e421e2f4_images_image-f663ee79-a6b1-47ad-b0ce-8b2d3e7c5d43.png",
);

const INDUSTRY_NAMES = [
  "pharmaceuticals",
  "manufacturing",
  "hospitality",
  "it",
  "gems-jewellery",
  "textiles",
  "banking",
  "edtech",
];

function knockOutLightBackground(data, channels) {
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    const lum = (r + g + b) / 3;
    if (lum > 198 && chroma < 38) {
      data[i + 3] = 0;
    } else if (lum > 232) {
      data[i + 3] = 0;
    }
  }
}

async function cleanPng(filePath) {
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  knockOutLightBackground(data, info.channels);
  const trimmed = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  await sharp(trimmed).toFile(filePath);
  const meta = await sharp(trimmed).metadata();
  return meta;
}

async function splitIndustries() {
  const outDir = path.resolve("public/images/industries/home");
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(COMPOSITE).metadata();
  const w = meta.width ?? 1024;
  const h = meta.height ?? 576;
  const cols = 4;
  const rows = 2;
  const cellW = Math.floor(w / cols);
  const cellH = Math.floor(h / rows);
  const insetX = Math.round(cellW * 0.06);
  const insetY = Math.round(cellH * 0.05);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const left = col * cellW + insetX;
      const top = row * cellH + insetY;
      const width = cellW - insetX * 2;
      const height = cellH - insetY * 2;
      const out = path.join(outDir, `${INDUSTRY_NAMES[i]}.png`);
      await sharp(COMPOSITE).extract({ left, top, width, height }).png().toFile(out);
      const m = await cleanPng(out);
      console.log("industry", INDUSTRY_NAMES[i], m.width, m.height);
    }
  }
}

async function cleanLogo() {
  const logo = path.resolve("public/images/brand/mira-konnect-sunset-logo.png");
  const m = await cleanPng(logo);
  console.log("logo", m.width, m.height);
}

await splitIndustries();
await cleanLogo();

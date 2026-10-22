/**

 * Slice industries-grid-source.(png|jpg) (5×2 cards) into sector photos.

 * Each card has TWO photos stacked (top = _1 / -a, bottom = _2 / -b), full card width.

 * Run: npm run images:industries

 */

import { execFile } from "node:child_process";

import { promisify } from "node:util";

import fs from "node:fs";

import path from "node:path";

import { fileURLToPath } from "node:url";

import ffmpegPath from "@ffmpeg-installer/ffmpeg";



const execFileAsync = promisify(execFile);

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const baseDir = path.join(root, "public", "images", "industries");

const outSector = path.join(baseDir, "sectors");

const outHome = path.join(baseDir, "home");

const outPublic = path.join(root, "public", "images");

const FFMPEG = ffmpegPath.path;



const sectors = [

  { slug: "pharmaceuticals-lifesciences", fileBase: "pharmaceuticals_lifesciences" },

  { slug: "manufacturing-engineering", fileBase: "manufacturing_engineering" },

  { slug: "hospitality", fileBase: "hospitality" },

  { slug: "it", fileBase: "it_industry" },

  { slug: "gems-jewellery", fileBase: "gems_jewellery" },

  { slug: "textiles", fileBase: "textiles" },

  { slug: "banking-insurance", fileBase: "banking_insurance" },

  { slug: "edtech", fileBase: "edtech" },

  { slug: "digital-marketing", fileBase: "digital_marketing" },

  { slug: "fmcg", fileBase: "fmcg" },

];



/** Detail panels on /industries — export landscape photos at usable width */

const DETAIL_EXPORT_WIDTH = 1280;



function findSource() {

  for (const name of ["industries-grid-source.png", "industries-grid-source.jpg"]) {

    const p = path.join(baseDir, name);

    if (fs.existsSync(p)) return p;

  }

  return null;

}



async function probeSize(file) {

  try {

    await execFileAsync(FFMPEG, ["-i", file], { maxBuffer: 10 * 1024 * 1024 });

  } catch (err) {

    const text = String(err.stderr ?? "");

    const m = text.match(/,\s*(\d+)x(\d+)/);

    if (m) return { w: Number(m[1]), h: Number(m[2]) };

  }

  return { w: 1920, h: 1080 };

}



function withDetailScale(cropExpr) {

  return `${cropExpr},scale=${DETAIL_EXPORT_WIDTH}:-2:flags=lanczos`;

}



async function crop(input, filter, out, qv = "2") {
  await execFileAsync(FFMPEG, ["-y", "-i", input, "-vf", filter, "-q:v", qv, out], {
    maxBuffer: 10 * 1024 * 1024,
  });
}



async function main() {

  const source = findSource();

  if (!source) {

    console.error("Missing industries-grid-source.png/jpg in public/images/industries/");

    process.exit(1);

  }

  fs.mkdirSync(outSector, { recursive: true });

  fs.mkdirSync(outHome, { recursive: true });

  fs.mkdirSync(outPublic, { recursive: true });



  const { w, h } = await probeSize(source);

  const cols = 5;

  const rows = 2;

  const cardW = Math.floor(w / cols);

  const cardH = Math.floor(h / rows);

  const headerFrac = 0.14;

  const footerFrac = 0.16;

  const imageYOff = Math.floor(cardH * headerFrac);

  const imageZoneH = Math.floor(cardH * (1 - headerFrac - footerFrac));

  const gap = Math.max(2, Math.floor(imageZoneH * 0.03));

  const photoH = Math.floor((imageZoneH - gap) / 2);



  for (let i = 0; i < 10; i++) {

    const col = i % cols;

    const row = Math.floor(i / cols);

    const x = col * cardW;

    const y = row * cardH;

    const iy = y + imageYOff;

    const topY = iy;

    const bottomY = iy + photoH + gap;

    const { slug, fileBase } = sectors[i];



    const cropTop = `crop=${cardW}:${photoH}:${x}:${topY}`;

    const cropBottom = `crop=${cardW}:${photoH}:${x}:${bottomY}`;

    const cropFull = `crop=${cardW}:${imageZoneH}:${x}:${iy}`;



    const aPath = path.join(outSector, `${slug}-a.jpg`);

    const bPath = path.join(outSector, `${slug}-b.jpg`);

    const homePath = path.join(outHome, `${slug}.jpg`);

    const publicA = path.join(outPublic, `${fileBase}_1.jpg`);

    const publicB = path.join(outPublic, `${fileBase}_2.jpg`);



    await crop(source, cropTop, aPath);

    await crop(source, cropBottom, bPath);

    await crop(source, cropFull, homePath);

    await crop(source, withDetailScale(cropTop), publicA, "1");

    await crop(source, withDetailScale(cropBottom), publicB, "1");

    console.log("Wrote", slug);

  }

  console.log("Done → sectors/, home/, public/images/*_{1,2}.jpg");

}



main().catch((e) => {

  console.error(e);

  process.exit(1);

});



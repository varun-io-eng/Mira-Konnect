/**
 * Verify blog YouTube IDs are embeddable (oEmbed 200).
 * node scripts/check-blog-youtube-videos.mjs
 */
import { blogResources } from "../src/data/blog-resources.ts";

let failed = 0;
for (const post of blogResources) {
  const id = post.youtubeVideoId;
  const url = `https://www.youtube.com/watch?v=${id}`;
  try {
    const r = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
    );
    if (!r.ok) {
      console.log("FAIL", r.status, `#${post.number}`, id);
      failed++;
      continue;
    }
    const data = await r.json();
    console.log("OK", `#${post.number}`, id, data.title);
  } catch (e) {
    console.log("ERR", `#${post.number}`, e.message);
    failed++;
  }
}
if (failed) {
  process.exitCode = 1;
  console.error(`\n${failed} video(s) need a new youtubeVideoId.`);
} else {
  console.log("\nAll blog YouTube videos embeddable.");
}

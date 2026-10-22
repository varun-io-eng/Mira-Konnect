/**
 * Verify blog reference URLs return HTTP 2xx (run after editing blog-resources.ts).
 * node scripts/check-blog-reference-urls.mjs
 */
import { blogResources } from "../src/data/blog-resources.ts";

const h = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };

let failed = 0;
for (const post of blogResources) {
  try {
    const r = await fetch(post.referenceUrl, { redirect: "follow", headers: h });
    const ok = r.status >= 200 && r.status < 400;
    console.log(ok ? "OK" : "FAIL", r.status, `#${post.number}`, post.referenceUrl);
    if (!ok) failed++;
  } catch (e) {
    console.log("ERR", `#${post.number}`, e.message);
    failed++;
  }
}
if (failed) {
  process.exitCode = 1;
  console.error(`\n${failed} reference link(s) need fixing.`);
} else {
  console.log("\nAll blog reference links OK.");
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_PATH = path.join(ROOT, "src/data/products.json");
const OUTPUT_DIR = path.join(ROOT, "public/images/products");

const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf-8"));

function extractAsin(url) {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/);
  return match ? match[1] : null;
}

async function fetchAmazonImage(url, productId) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      console.log(`  [${productId}] HTTP ${res.status}`);
      return null;
    }

    const html = await res.text();

    // Try og:image meta tag first
    let imgMatch = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"/
    );
    if (!imgMatch) {
      imgMatch = html.match(
        /<meta\s+content="([^"]+)"\s+property="og:image"/
      );
    }

    // Try landingImage
    if (!imgMatch) {
      imgMatch = html.match(/"landingImageUrl"\s*:\s*"([^"]+)"/);
    }

    // Try hiRes image from data
    if (!imgMatch) {
      imgMatch = html.match(/"hiRes"\s*:\s*"([^"]+)"/);
    }

    // Try main image
    if (!imgMatch) {
      imgMatch = html.match(/"large"\s*:\s*"([^"]+)"/);
    }

    if (imgMatch) {
      return imgMatch[1].replace(/\\u002F/g, "/");
    }

    console.log(`  [${productId}] No image found in HTML`);
    return null;
  } catch (err) {
    console.log(`  [${productId}] Fetch error: ${err.message}`);
    return null;
  }
}

async function downloadImage(imageUrl, outputPath) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 5000) return false; // too small, probably an error
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("=== Download Real Product Images from Amazon ===\n");
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const entries = Object.entries(products);
  let success = 0;
  let fail = 0;
  let skipped = 0;

  // Check which products need images (placeholder = same size as coway)
  const placeholderStat = fs.statSync(
    path.join(OUTPUT_DIR, "coway-airmega-ap1512hh.jpg")
  );
  const placeholderSize = placeholderStat.size;

  for (const [id, product] of entries) {
    const outputPath = path.join(OUTPUT_DIR, `${id}.jpg`);

    // Skip if image exists and isn't a placeholder (different size)
    if (fs.existsSync(outputPath)) {
      const stat = fs.statSync(outputPath);
      if (stat.size !== placeholderSize || id === "coway-airmega-ap1512hh") {
        // Real image already exists (or it's the original coway)
        // Still try to download for all to get real images
      }
    }

    const asin = extractAsin(product.amazonLink);
    if (!asin) {
      console.log(`  [${id}] No ASIN found in: ${product.amazonLink}`);
      fail++;
      continue;
    }

    const amazonUrl = `https://www.amazon.com/dp/${asin}`;
    console.log(`Fetching ${id} (ASIN: ${asin})...`);

    const imageUrl = await fetchAmazonImage(amazonUrl, id);

    if (imageUrl) {
      const downloaded = await downloadImage(imageUrl, outputPath);
      if (downloaded) {
        const size = fs.statSync(outputPath).size;
        console.log(
          `  ✓ Saved (${(size / 1024).toFixed(1)} KB)`
        );
        success++;
      } else {
        console.log(`  ✗ Download failed`);
        fail++;
      }
    } else {
      fail++;
    }

    // Rate limit - be respectful
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(
    `\n=== Done: ${success} downloaded, ${fail} failed, ${skipped} skipped ===`
  );
}

main().catch(console.error);

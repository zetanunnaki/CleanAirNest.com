import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public/images/products");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

/**
 * Targeted downloads for 3 products that need real images.
 * Strategy: fetch the manufacturer product page, extract og:image and Shopify CDN URLs,
 * download the best image, and convert to WebP using sharp.
 */
const targetProducts = [
  {
    id: "dreo-3l-bedroom",
    name: "Dreo 3L Cool Mist Humidifier",
    filename: "dreo-3l-bedroom.webp",
    pageUrl: "https://www.dreo.com/products/hm311s-smart-humidifier",
    directUrls: [
      "https://www.dreo.com/cdn/shop/files/HM311S_black_2.png?v=1753332951&width=1200",
      "https://www.dreo.com/cdn/shop/files/DR-HHM001s_2.png?v=1753329368&width=1200",
    ],
  },
  {
    id: "breathe-airmonitor-plus",
    name: "BREATHE Airmonitor Plus",
    filename: "breathe-airmonitor-plus.webp",
    pageUrl: "https://breathe-tech.com/products/breathe-airmonitor-plus",
    directUrls: [],
  },
  {
    id: "aeocky-74-pint",
    name: "AEOCKY 74-Pint Dehumidifier",
    filename: "aeocky-74-pint.webp",
    pageUrl: "https://aeocky.com/products/4500-sq-ft-energy-star-2025-dehumidifier-aeocky-max-74-pint-dstandard-52pint-d-smart-compressor-dehumidifier-with-drain-hose-intelligent-humidistat-for-basement-bedroom-home-bathroom-%E5%89%AF%E6%9C%AC",
    directUrls: [],
  },
];

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractOgImage(html) {
  const match = html.match(/<meta\s+(?:property="og:image"\s+content="([^"]+)"|content="([^"]+)"\s+property="og:image")/i);
  if (match) {
    const url = match[1] || match[2];
    return url.startsWith("//") ? "https:" + url : url;
  }
  return null;
}

function extractShopifyImages(html) {
  const regex = /(?:https?:)?\/\/[^"'\s>]+cdn\/shop\/(?:files|products)\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s>]*)?/gi;
  const matches = [...new Set(html.match(regex) || [])];
  return matches
    .filter(u => !u.includes("icon") && !u.includes("logo") && !u.includes("badge") && !u.includes("favicon") && !u.includes("payment"))
    .map(u => u.startsWith("//") ? "https:" + u : u);
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "image/webp,image/png,image/jpeg,image/*,*/*",
      Referer: new URL(url).origin + "/",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function convertToWebp(inputBuffer, outputPath) {
  try {
    const sharp = (await import("sharp")).default;
    const webpBuffer = await sharp(inputBuffer)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    fs.writeFileSync(outputPath, webpBuffer);
    return { size: webpBuffer.length, converted: true };
  } catch (e) {
    // sharp not available, save raw image data
    fs.writeFileSync(outputPath, inputBuffer);
    return { size: inputBuffer.length, converted: false };
  }
}

async function downloadProduct(product) {
  console.log(`\n--- ${product.name} ---`);
  const outputPath = path.join(OUTPUT_DIR, product.filename);

  let candidateUrls = [...product.directUrls];

  // Discover image URLs from the product page
  try {
    console.log(`  Fetching page: ${product.pageUrl.substring(0, 80)}...`);
    const html = await fetchPage(product.pageUrl);

    const ogImage = extractOgImage(html);
    if (ogImage) {
      console.log(`  Found og:image: ${ogImage.substring(0, 100)}...`);
      const largeOg = ogImage.replace(/width=\d+/, "width=1200");
      candidateUrls.unshift(largeOg);
    }

    const shopifyImages = extractShopifyImages(html);
    if (shopifyImages.length > 0) {
      console.log(`  Found ${shopifyImages.length} Shopify CDN images`);
      const largeImages = shopifyImages.map(u => u.replace(/width=\d+/, "width=1200"));
      candidateUrls.push(...largeImages.slice(0, 5));
    }
  } catch (e) {
    console.log(`  Could not fetch product page: ${e.message}`);
  }

  candidateUrls = [...new Set(candidateUrls)];

  if (candidateUrls.length === 0) {
    console.log(`  FAILED: No image URLs found for ${product.name}`);
    return false;
  }

  for (const url of candidateUrls) {
    try {
      console.log(`  Trying: ${url.substring(0, 100)}...`);
      const buffer = await downloadBuffer(url);

      if (buffer.length < 2000) {
        console.log(`    Too small (${buffer.length} bytes), skipping`);
        continue;
      }

      const result = await convertToWebp(buffer, outputPath);
      console.log(`  SUCCESS: ${product.filename} (${(result.size / 1024).toFixed(1)} KB${result.converted ? ", WebP" : ", raw"})`);
      return true;
    } catch (e) {
      console.log(`    Failed: ${e.message}`);
    }
  }

  console.log(`  FAILED: Could not download any image for ${product.name}`);
  return false;
}

async function main() {
  console.log("=== Download Product Images from Manufacturer Sites ===\n");

  let success = 0;
  for (const product of targetProducts) {
    if (await downloadProduct(product)) success++;
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n=== Done: ${success}/${targetProducts.length} downloaded successfully ===`);

  if (success < targetProducts.length) {
    console.log("\nFor failed downloads, try:");
    console.log("  1. Visit the manufacturer page in a browser");
    console.log("  2. Right-click the product image -> Copy image address");
    console.log("  3. Download manually and save to public/images/products/");
  }
}

main().catch(console.error);

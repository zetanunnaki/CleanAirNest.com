import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const DIRS = [
  path.join(ROOT, "public/images/covers"),
  path.join(ROOT, "public/images/products"),
];

const COVER_MAX_WIDTH = 1200;
const PRODUCT_MAX_WIDTH = 800;
const WEBP_QUALITY = 82;

async function optimizeImage(inputPath, isProduct) {
  const ext = path.extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const webpPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  if (fs.existsSync(webpPath)) {
    const srcStat = fs.statSync(inputPath);
    const webpStat = fs.statSync(webpPath);
    if (webpStat.mtimeMs >= srcStat.mtimeMs) return null;
  }

  const maxWidth = isProduct ? PRODUCT_MAX_WIDTH : COVER_MAX_WIDTH;

  try {
    const metadata = await sharp(inputPath).metadata();
    let pipeline = sharp(inputPath);

    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(webpPath);

    const origSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((1 - webpSize / origSize) * 100).toFixed(0);

    return {
      file: path.basename(inputPath),
      origKB: (origSize / 1024).toFixed(0),
      webpKB: (webpSize / 1024).toFixed(0),
      savings: savings + "%",
    };
  } catch (err) {
    console.error(`  Error: ${path.basename(inputPath)}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("=== Image Optimization (WebP) ===\n");

  let totalOrig = 0;
  let totalWebp = 0;
  let count = 0;

  for (const dir of DIRS) {
    const isProduct = dir.includes("products");
    const label = isProduct ? "Products" : "Covers";
    console.log(`\n--- ${label} (${dir}) ---`);

    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    for (const file of files) {
      const result = await optimizeImage(path.join(dir, file), isProduct);
      if (result) {
        console.log(`  ${result.file} → ${result.origKB}KB → ${result.webpKB}KB (${result.savings} smaller)`);
        totalOrig += parseInt(result.origKB);
        totalWebp += parseInt(result.webpKB);
        count++;
      }
    }
  }

  console.log(`\n=== Done: ${count} images optimized ===`);
  if (count > 0) {
    console.log(`Total: ${(totalOrig / 1024).toFixed(1)}MB → ${(totalWebp / 1024).toFixed(1)}MB (${((1 - totalWebp / totalOrig) * 100).toFixed(0)}% smaller)`);
  }
}

main().catch(console.error);

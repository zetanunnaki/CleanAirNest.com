import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public/images/products");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const productImageUrls = {
  "coway-airmega-ap1512hh": "https://www.cowaymega.com/cdn/shop/files/AP-1512HH-F_White_Front.png",
  "levoit-core-400s": "https://levoit.com/cdn/shop/files/Core400S_white_front.png",
  "blueair-blue-pure-211": "https://www.blueair.com/cdn/shop/products/Blue-Pure-211-plus_front.png",
  "dyson-purifier-big-quiet": "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/BP03.png",
  "winix-5500-2": "https://winixamerica.com/cdn/shop/products/5500-2_front.png",
  "levoit-core-300": "https://levoit.com/cdn/shop/files/Core300_white_front.png",
  "honeywell-hpa300": "https://www.honeywellhome.com/content/dam/honeywell-ecommerce/en/images/products/HPA300/HPA300_Front.png",
  "airthings-view-plus": "https://www.airthings.com/cdn/shop/products/view-plus_front.png",
  "amazon-air-quality-monitor": "https://m.media-amazon.com/images/I/51x1V5ykTwL._AC_SL1000_.jpg",
  "awair-element": "https://www.getawair.com/cdn/shop/products/awair-element_front.png",
  "levoit-lv600s": "https://levoit.com/cdn/shop/files/LV600S_front.png",
  "honeywell-hev685w": "https://www.honeywellhome.com/content/dam/honeywell-ecommerce/en/images/products/HEV685W/HEV685W_Front.png",
  "dreo-oversized-6l": "https://www.dreo.com/cdn/shop/products/humidifier-6l_front.png",
  "frigidaire-ffad5033w1": "https://www.frigidaire.com/globalassets/quoting/quoting-images/dehumidifiers/FFAD5033W1.png",
  "midea-20-pint": "https://www.midea.com/content/dam/midea-aem/us/products/air-treatment/dehumidifiers/20-pint-dehumidifier/MAD20S1QWT_front.png",
  "ge-adel45ly": "https://www.geappliances.com/on/demandware.static/-/Sites-ge-master-catalog/default/images/ADEL45LY_front.png",
  "iqair-healthpro-plus": "https://www.iqair.com/sites/default/files/products/healthpro-plus-front.png",
  "molekule-air-mini-plus": "https://molekule.com/cdn/shop/products/air-mini-plus_front.png",
  "rabbit-air-minusa2": "https://www.rabbitair.com/cdn/shop/products/MinusA2-Front.png",
  "medify-ma40": "https://medifyair.com/cdn/shop/products/MA-40_White_Front.png",
  "homelabs-4500": "https://www.homelabs.com/cdn/shop/products/dehumidifier-4500_front.png",
  "canopy-humidifier": "https://www.getcanopy.co/cdn/shop/products/canopy-humidifier_front.png",
  "alen-breathesmart-45i": "https://alen.com/cdn/shop/products/BreatheSmart45i_White_Front.png",
  "coway-airmega-400": "https://www.cowaymega.com/cdn/shop/files/Airmega400S_Graphite_Front.png",
  "hathaspace-hsp001": "https://hathaspace.com/cdn/shop/products/HSP001_Front.png",
  "temtop-m10": "https://temtop.com/cdn/shop/products/M10_front.png",
  "vornado-evdc300": "https://www.vornado.com/cdn/shop/products/EVDC300_front.png",
  "austin-air-healthmate": "https://austinair.com/cdn/shop/products/HealthMate-HM400-Black-Front.png",
  "bissell-air320": "https://www.bissell.com/on/demandware.static/-/Sites-master-catalog/default/images/air320-smart-purifier.png",
  "shark-air-purifier-6": "https://www.sharkclean.com/cdn/shop/products/HP201_front.png",
  "germguardian-ac5250pt": "https://www.guardiantechnologies.com/cdn/shop/products/AC5250PT_front.png",
  "blueair-classic-605": "https://www.blueair.com/cdn/shop/products/Classic-605_front.png",
  "levoit-vital-200s": "https://levoit.com/cdn/shop/files/Vital200S_front.png",
  "samsung-bespoke-cube": "https://image-us.samsung.com/SamsungUS/home/home-appliances/air-care/bespoke-cube-air-purifier/AX53A9350WG_front.png",
  "winix-am90": "https://winixamerica.com/cdn/shop/products/AM90_front.png",
  "dyson-purifier-cool-tp07": "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/TP07.png",
  "iqair-airvisual-pro": "https://www.iqair.com/sites/default/files/products/airvisual-pro-front.png",
  "uhoo-aura": "https://www.uhooair.com/cdn/shop/products/uhoo-aura_front.png",
  "purpleair-flex": "https://www2.purpleair.com/cdn/shop/products/PurpleAir-Flex_front.png",
  "aranet4-home": "https://aranet.com/cdn/shop/products/aranet4-home_front.png",
  "dyson-ph04": "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/PH04.png",
  "aquaoasis-cool-mist": "https://m.media-amazon.com/images/I/61h5QfaODIL._AC_SL1500_.jpg",
  "aircare-ma1201": "https://www.aircaremoisture.com/cdn/shop/products/MA1201_front.png",
  "pure-enrichment-mistaire": "https://pureenrichment.com/cdn/shop/products/MistAire_front.png",
  "hey-dewy-humidifier": "https://heydewy.com/cdn/shop/products/hey-dewy-portable-humidifier_front.png",
  "tosot-50-pint": "https://tosot.com/cdn/shop/products/50-pint-dehumidifier_front.png",
  "lg-puricare-dehumidifier": "https://www.lg.com/us/images/dehumidifiers/md08000025/gallery/DT.png",
  "keystone-kstad50b": "https://www.keystoneac.com/cdn/shop/products/KSTAD50B_front.png",
  "vremi-50-pint": "https://vremi.com/cdn/shop/products/50-pint-dehumidifier_front.png",
  "hisense-70-pint": "https://www.hisense-usa.com/cdn/shop/products/DH7021K1W_front.png",
};

async function downloadImage(url, outputPath, productId) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept: "image/webp,image/png,image/jpeg,image/*,*/*",
        Referer: new URL(url).origin + "/",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      console.log(`  [${productId}] HTTP ${res.status} from ${new URL(url).hostname}`);
      return false;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("image") && !contentType.includes("octet-stream")) {
      console.log(`  [${productId}] Not an image: ${contentType}`);
      return false;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 3000) {
      console.log(`  [${productId}] Image too small (${buffer.length} bytes), likely error`);
      return false;
    }

    fs.writeFileSync(outputPath, buffer);
    console.log(`  ✓ ${productId} saved (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.log(`  [${productId}] Error: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("=== Download Manufacturer Product Images ===\n");

  let success = 0;
  let fail = 0;

  for (const [id, url] of Object.entries(productImageUrls)) {
    const outputPath = path.join(OUTPUT_DIR, `${id}.jpg`);
    console.log(`Fetching ${id}...`);
    const ok = await downloadImage(url, outputPath, id);
    if (ok) success++;
    else fail++;
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n=== Done: ${success} downloaded, ${fail} failed ===`);
  if (fail > 0) {
    console.log(
      "\nFor failed images, you can manually download from the manufacturer website"
    );
    console.log("or run: npx tsx scripts/generate-images.ts to generate with KIE API");
  }
}

main().catch(console.error);

/**
 * Cover Image Generator using KIE API (Flux Kontext Pro)
 *
 * Usage:
 *   npx tsx scripts/generate-images.ts
 *
 * Generates editorial cover images for guides, reviews, and best-picks.
 * Product images use real manufacturer photos — this script only handles covers.
 */

import fs from "fs";
import path from "path";

const KIE_API_KEY = process.env.KIE_API_KEY || "a34ec7e113fd3f211e45fc9c44ecaabb";
const KIE_GENERATE_URL = "https://api.kie.ai/api/v1/flux/kontext/generate";
const KIE_STATUS_URL = "https://api.kie.ai/api/v1/flux/kontext/record-info";
const COVER_DIR = path.join(process.cwd(), "public/images/covers");

const coverPrompts: Record<string, string> = {
  "allergy-purifiers":
    "Clean modern living room with soft natural light, air purifier in corner, pollen particles visible in sunbeam, photorealistic, warm tones, editorial photography",
  "wildfire-purifiers":
    "View from inside a modern home looking out window at hazy orange wildfire smoke sky, air purifier prominently placed nearby, moody atmospheric photography",
  "coway-review":
    "Close-up lifestyle photo of a modern white air purifier on a side table next to a cozy reading nook, warm ambient lighting, editorial style",
  "airthings-review":
    "Smart home air quality monitor on a minimalist wooden desk showing digital readings, soft bokeh background of a modern bedroom, lifestyle photography",
  "levoit-review":
    "Modern smart air purifier with LED display in a contemporary bedroom, nighttime ambient lighting, lifestyle product photography",
  "test-air-quality":
    "Person holding a portable air quality monitor while inspecting air in a modern home, natural lighting, documentary style photography",
  "hepa-filter":
    "Close-up macro photography of HEPA filter material with particles being captured, scientific visualization, clean background, educational",
  "baby-nursery":
    "Peaceful baby nursery with soft pastel colors, small air purifier on shelf, crib in background, warm gentle lighting, lifestyle interior photography",
  "aq-monitors":
    "Three different air quality monitors arranged on a modern desk showing various readings, comparison photography, clean white background",
  "dehumidifier-basement":
    "Modern basement with dehumidifier running, visible improvement in air quality, warm lighting, lifestyle photography",
  "dust-removal":
    "Sunlight streaming through window revealing floating dust particles in a modern living room, air purifier nearby, cinematic lighting, photorealistic editorial photography",
  "cigarette-smoke":
    "Moody atmospheric photo of smoke wisps in a dimly lit room with a sleek air purifier cutting through the haze, dramatic lighting, editorial photography",
  "smart-home-purifier":
    "Modern smart home setup with air purifier connected to phone app, futuristic clean aesthetic, teal and white color palette, editorial tech photography",
  "washable-filter":
    "Close-up of hands washing an air purifier pre-filter under running water in a clean modern kitchen sink, bright natural lighting, instructional lifestyle photography",
  "portable-monitors":
    "Collection of portable air quality monitoring devices on a travel bag, flat lay photography, clean white marble background, lifestyle product shot",
  "whole-house":
    "Beautiful open concept modern home interior with large air purifier in the center, floor to ceiling windows, natural light flooding in, architectural interior photography",
  "mold-mildew":
    "Dark damp corner of a room with visible mold on wall transitioning to a clean bright wall with air purifier, split composition, dramatic editorial photography",
  "bedroom-humidifier":
    "Cozy modern bedroom at night with soft warm lighting, humidifier producing gentle mist on nightstand next to bed, peaceful sleep atmosphere, lifestyle interior photography",
  "crawl-space":
    "Clean organized crawl space with a heavy-duty dehumidifier unit installed, LED work lights, proper vapor barrier on floor, professional home improvement photography",
  "vocs-chemicals":
    "Modern home office with new furniture, air purifier with activated carbon filter nearby, warm editorial lighting, photorealistic lifestyle",
  "air-quality-index":
    "City skyline at golden hour with visible smog layers transitioning from clean blue sky above to hazy below, atmospheric environmental photography",
  "air-purifier-maintenance":
    "Hands carefully removing a used HEPA filter from an air purifier on a clean countertop, new filter in packaging nearby, bright instructional photography",
  "energy-costs":
    "Modern air purifier plugged into a smart power meter showing low wattage reading, energy efficient green glow, clean modern interior, tech lifestyle photography",
  "humidity-health":
    "Comfortable modern living room with a hygrometer showing ideal humidity level, houseplants, soft natural lighting, health and wellness editorial photography",
  "radon-home":
    "Modern home basement with radon testing kit on floor, professional environmental testing setup, documentary style photography",
  "carbon-filter":
    "Macro close-up of activated carbon granules with visible porous surface texture, dramatic side lighting, scientific photography, dark background",
  "newborn-nursery":
    "Peaceful nursery with white crib, soft pastel mobile, small quiet air purifier on shelf, golden hour light through sheer curtains, warm parenting lifestyle photography",
  "wildfire-season":
    "Dramatic orange wildfire sky visible through a modern home window, clean interior with air purifier running, contrasting warm interior vs hazy exterior",
  "levoit-vs-blueair":
    "Two modern air purifiers facing each other on opposite sides of a clean white table, dramatic split lighting, product comparison editorial photography",
  "homepage-hero":
    "Bright airy modern living room with large windows and clean blue sky, green plants, air purifier blending into decor, aspirational lifestyle photography",
  "air-purifier-bedroom":
    "Minimalist modern bedroom with a compact air purifier on nightstand, soft ambient lighting, cozy bedding, peaceful sleep atmosphere, lifestyle interior photography",
  "air-purifier-comparison":
    "Two modern air purifiers side by side on a clean white table with specs comparison cards between them, bright studio lighting, product comparison editorial photography",
  "air-quality-guide":
    "Modern kitchen with range hood and open window, steam rising from cooking, air quality monitor on counter showing readings, warm editorial lifestyle photography",
  "allergies-air-purifier":
    "Bright spring living room with blooming flowers visible through window, air purifier running nearby, person breathing easily on couch, warm natural lighting, lifestyle photography",
  "dehumidifier-guide":
    "Modern basement or laundry room with a sleek dehumidifier unit running, visible water tank, clean organized space, practical home improvement photography",
  "humidifier-guide":
    "Cozy winter living room with humidifier producing gentle mist, frost visible on windows outside, warm interior lighting, indoor plants thriving, lifestyle editorial photography",
  "pet-air-purifier":
    "Happy golden retriever lying next to a modern air purifier in a bright living room, subtle fur particles visible in sunbeam, warm lifestyle photography",
};

async function submitTask(prompt: string): Promise<string | null> {
  try {
    const res = await fetch(KIE_GENERATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: "flux-kontext-pro",
        aspectRatio: "16:9",
        outputFormat: "jpeg",
        safetyTolerance: 2,
      }),
    });

    const data = await res.json();

    if (data.code === 200 && data.data?.taskId) {
      return data.data.taskId;
    }

    console.error(`  Submit error: ${data.msg || JSON.stringify(data)}`);
    return null;
  } catch (err) {
    console.error(`  Network error:`, (err as Error).message);
    return null;
  }
}

async function pollTask(taskId: string, maxAttempts = 60): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 5000));

    try {
      const res = await fetch(`${KIE_STATUS_URL}?taskId=${taskId}`, {
        headers: { Authorization: `Bearer ${KIE_API_KEY}` },
      });

      const data = await res.json();

      if (data.code === 200 && data.data) {
        if (data.data.successFlag === 1 && data.data.response?.resultImageUrl) {
          return data.data.response.resultImageUrl;
        }
        if (data.data.successFlag === 0 && data.data.errorMessage) {
          console.error(`  Failed: ${data.data.errorMessage}`);
          return null;
        }
      }

      process.stdout.write(".");
    } catch {
      process.stdout.write("x");
    }
  }

  console.error(`\n  Timed out after ${maxAttempts * 5}s`);
  return null;
}

async function downloadImage(url: string, outputPath: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  Download HTTP ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 5000) {
      console.error(`  File too small (${buffer.length} bytes)`);
      return false;
    }
    fs.writeFileSync(outputPath, buffer);
    console.log(`  ✓ Saved (${(buffer.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.error(`  Download error:`, (err as Error).message);
    return false;
  }
}

async function main() {
  console.log("=== CleanAirNest Cover Image Generator (KIE Flux Kontext Pro) ===\n");
  console.log(`API Key: ${KIE_API_KEY.substring(0, 8)}...`);
  console.log(`Output: ${COVER_DIR}\n`);

  fs.mkdirSync(COVER_DIR, { recursive: true });

  let success = 0;
  let fail = 0;
  const entries = Object.entries(coverPrompts);

  for (const [slug, prompt] of entries) {
    const outputPath = path.join(COVER_DIR, `${slug}.jpg`);

    if (fs.existsSync(outputPath)) {
      const stat = fs.statSync(outputPath);
      if (stat.size > 5000) {
        console.log(`Skipping ${slug}.jpg (already exists, ${(stat.size / 1024).toFixed(0)} KB)`);
        success++;
        continue;
      }
    }

    console.log(`\n[${success + fail + 1}/${entries.length}] Generating: ${slug}.jpg`);
    console.log(`  Prompt: ${prompt.substring(0, 80)}...`);

    const taskId = await submitTask(prompt);
    if (!taskId) {
      fail++;
      continue;
    }

    console.log(`  Task: ${taskId}`);
    const imageUrl = await pollTask(taskId);
    if (!imageUrl) {
      fail++;
      continue;
    }

    const ok = await downloadImage(imageUrl, outputPath);
    if (ok) success++;
    else fail++;

    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n=== Done: ${success} succeeded, ${fail} failed out of ${entries.length} ===`);
}

main().catch(console.error);

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "").replace(/\{[^}]*\}/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 238));
}

export function extractProductIds(content: string): string[] {
  const matches = content.matchAll(/<ProductCard\s+productId="([^"]+)"/g);
  return [...matches].map((m) => m[1]);
}

export function extractFaqItems(content: string): { question: string; answer: string }[] {
  const match = content.match(/<FAQ\s+items=\{(\[[\s\S]*?\])}\s*\/>/);
  if (!match) return [];
  try {
    const normalized = match[1]
      .replace(/\n/g, " ")
      .replace(/,\s*]/g, "]");
    const fn = new Function(`return ${normalized}`);
    return fn();
  } catch {
    return [];
  }
}

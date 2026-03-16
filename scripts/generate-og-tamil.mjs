#!/usr/bin/env node
/**
 * Generates a crisp PNG of "தேர்வு 2026" for use in the OpenGraph image.
 * Uses website fonts: Bricolage Grotesque (digits) + system Tamil (macOS) or Bricolage (fallback).
 */
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Website font: Bricolage Grotesque (has digits 0-9)
const bricolagePath = join(
  __dirname,
  "../node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-400-normal.woff"
);
GlobalFonts.registerFromPath(bricolagePath, "Bricolage Grotesque");

// System Tamil font (macOS) for "தேர்வு" — matches browser fallback when site renders Tamil
const tamilPaths = [
  "/System/Library/Fonts/Supplemental/Tamil Sangam MN.ttc",
  "/System/Library/Fonts/Supplemental/Tamil MN.ttc",
];
let tamilFont = "Bricolage Grotesque"; // fallback
for (const p of tamilPaths) {
  if (existsSync(p)) {
    try {
      GlobalFonts.registerFromPath(p, "Tamil");
      tamilFont = "Tamil";
      break;
    } catch (_) {}
  }
}

const width = 200;
const height = 36;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, width, height);
ctx.fillStyle = "#111111";
ctx.textBaseline = "middle";
ctx.textAlign = "center";

const fontSize = 28;
const tamilText = "தேர்வு";
const numText = " 2026";

// Draw "தேர்வு" with Tamil font
ctx.font = `${fontSize}px '${tamilFont}'`;
const tamilWidth = ctx.measureText(tamilText).width;

// Draw "2026" with Bricolage (website font, digits render correctly)
ctx.font = `${fontSize}px 'Bricolage Grotesque'`;
const numWidth = ctx.measureText(numText).width;

const totalWidth = tamilWidth + numWidth;
let x = (width - totalWidth) / 2;
const y = height / 2;

ctx.textAlign = "left";
ctx.font = `${fontSize}px '${tamilFont}'`;
ctx.fillText(tamilText, x, y);
x += tamilWidth;
ctx.font = `${fontSize}px 'Bricolage Grotesque'`;
ctx.fillText(numText, x, y);

const outPath = join(__dirname, "../public/og-tamil-2026.png");
writeFileSync(outPath, canvas.toBuffer("image/png"));
console.log("Wrote", outPath);

#!/usr/bin/env node
/**
 * Generate a QR code PNG for your deployed site.
 *
 * Usage:
 *   npm run qr -- https://your-site.vercel.app
 *   npm run qr -- https://your-site.vercel.app output.png
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import QRCode from "qrcode";

const url = process.argv[2];

if (!url) {
  console.error("\n  Usage: npm run qr -- <your-vercel-url>\n");
  console.error("  Example: npm run qr -- https://graduation-letter.vercel.app\n");
  process.exit(1);
}

const output = resolve(process.cwd(), process.argv[3] || "qr-code.png");

await QRCode.toFile(output, url, {
  type: "png",
  width: 512,
  margin: 2,
  color: { dark: "#2c2419", light: "#faf6f0" },
});

console.log(`\n  QR code saved to: ${output}`);
console.log(`  Points to: ${url}\n`);

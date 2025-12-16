/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("path");

async function generateIcons() {
  const sizes = [192, 512];

  const svgBuffer = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="#000000" rx="64"/>
      <text x="256" y="320" font-size="320" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-family="Arial, sans-serif" font-weight="bold">P</text>
    </svg>
  `);

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, "public", `icon-${size}x${size}.png`));

    console.log(`Generated icon-${size}x${size}.png`);
  }

  console.log("All icons generated successfully!");
}

generateIcons().catch(console.error);

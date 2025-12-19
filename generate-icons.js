import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import sharp from "sharp";

// This script reads `public/logo.svg` (preferred) or `public/logo.png` and generates:
// - PNG icons (16..512) under `public/icons/`
// - `favicon.ico` (requires `png-to-ico` dev dependency)
// - Social preview images `public/icons/opengraph-image.png` and `public/icons/twitter-image.png`

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const iconsDir = path.join(publicDir, "icons");
  await fsPromises.mkdir(iconsDir, { recursive: true });

  const srcSvg = path.join(publicDir, "logo.svg");
  const srcPng = path.join(publicDir, "logo.png");
  const src = fs.existsSync(srcSvg)
    ? srcSvg
    : fs.existsSync(srcPng)
    ? srcPng
    : null;

  if (!src) {
    console.error(
      "No logo found. Please place your logo at public/logo.svg (preferred) or public/logo.png and re-run `node generate-icons.js`"
    );
    process.exit(1);
  }

  const iconSizes = [16, 32, 48, 64, 96, 120, 152, 180, 192, 256, 384, 512];

  for (const size of iconSizes) {
    const outPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(src)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(outPath);
    console.log(`Generated ${path.relative(process.cwd(), outPath)}`);
  }

  // Generate favicon.ico from a couple of PNGs if png-to-ico is available
  let pngToIco = null;
  const mod = await import("png-to-ico");
  pngToIco = (mod && (mod.default || mod)) ?? null;
  let generatedFavicon = false;

  if (pngToIco) {
    try {
      const icoPngs = [32, 16].map((s) =>
        path.join(iconsDir, `icon-${s}x${s}.png`)
      );
      const buf = await pngToIco(icoPngs);
      const faviconPath = path.join(publicDir, "favicon.ico");
      await fsPromises.writeFile(faviconPath, buf);
      console.log(`Generated ${path.relative(process.cwd(), faviconPath)}`);
      generatedFavicon = true;
    } catch (e) {
      console.warn("png-to-ico failed to generate favicon.ico:", e);
    }
  }

  // Fallback: try `to-ico` which accepts PNG buffers
  if (!generatedFavicon) {
    try {
      const toIcoMod = await import("to-ico");
      const toIco = (toIcoMod && (toIcoMod.default || toIcoMod)) ?? null;
      if (toIco) {
        const pngFiles = [32, 16].map((s) =>
          path.join(iconsDir, `icon-${s}x${s}.png`)
        );
        const buffers = await Promise.all(
          pngFiles.map((p) => fsPromises.readFile(p))
        );
        const buf = await toIco(buffers);
        const faviconPath = path.join(publicDir, "favicon.ico");
        await fsPromises.writeFile(faviconPath, buf);
        console.log(
          `Generated ${path.relative(
            process.cwd(),
            faviconPath
          )} (to-ico fallback)`
        );
        generatedFavicon = true;
      }
    } catch (e) {
      // ignore; we'll inform user below if favicon wasn't generated
    }
  }

  if (!generatedFavicon) {
    console.log(
      "Could not generate favicon.ico automatically; you can (1) install/repair `png-to-ico` or `to-ico`, or (2) add a favicon manually at public/favicon.ico."
    );
  }

  // Social preview images
  const ogOut = path.join(iconsDir, "opengraph-image.png");
  await sharp(src).resize(1200, 630, { fit: "cover" }).png().toFile(ogOut);
  console.log(`Generated ${path.relative(process.cwd(), ogOut)}`);

  const twOut = path.join(iconsDir, "twitter-image.png");
  await sharp(src).resize(1200, 628, { fit: "cover" }).png().toFile(twOut);
  console.log(`Generated ${path.relative(process.cwd(), twOut)}`);

  console.log("All assets generated in public/icons/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

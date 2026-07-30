import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicRoot = path.resolve("public");
let originalBytes = 0;
let optimizedBytes = 0;
let optimizedFiles = 0;

async function visit(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.resolve(directory, entry.name);
    if (!absolutePath.startsWith(`${publicRoot}${path.sep}`)) {
      throw new Error(`Refusing to process a path outside public: ${absolutePath}`);
    }

    if (entry.isDirectory()) {
      await visit(absolutePath);
      continue;
    }

    if (!entry.isFile() || !/\.jpe?g$/i.test(entry.name)) continue;

    const before = await fs.stat(absolutePath);
    const temporaryPath = `${absolutePath}.afc-optimize.tmp`;
    await sharp(absolutePath)
      .rotate()
      .resize({
        width: 1600,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(temporaryPath);

    const after = await fs.stat(temporaryPath);
    originalBytes += before.size;

    if (after.size < before.size) {
      await fs.rename(temporaryPath, absolutePath);
      optimizedBytes += after.size;
      optimizedFiles += 1;
    } else {
      await fs.unlink(temporaryPath);
      optimizedBytes += before.size;
    }
  }
}

await visit(publicRoot);
const savedBytes = originalBytes - optimizedBytes;
console.log(
  `Optimized ${optimizedFiles} JPEG files; saved ${(savedBytes / 1024 / 1024).toFixed(2)} MB.`,
);

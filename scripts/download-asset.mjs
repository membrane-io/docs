import manifest from "../src/cloud-assets/manifest.json" assert { type: "json" };
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import https from "node:https";
import { createWriteStream } from "node:fs";
import { select, cancel, isCancel } from "@clack/prompts";

/**
 *
 * @param {string} url
 * @param {string} filePath
 */
const downloadFile = (url, filePath) => {
  const file = createWriteStream(filePath);
  https.get(url, (res) => res.pipe(file));
};

/**
 * @param {string} filePath
 */
export default function downloadAsset(filePath) {
  const file = filePath.replace("cloud-assets/", "");
  // @ts-expect-error
  const asset = manifest.assets[file];
  if (!asset) {
    throw new Error(`No asset found for ${filePath}`);
  }
  const url = `https://pub-9f5707ce32c7495d9687b939883b271d.r2.dev/${asset}`;
  const path = join("src", "cloud-assets", file);
  return downloadFile(url, path);
}

// Check if module is main
if (import.meta.url.startsWith("file:")) {
  const modulePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    let path = process.argv[2];

    if (!path) {
      path = await select({
        message: "Select a program to download:",
        options: Object.keys(manifest.assets).map((file) => ({
          value: file,
          label: file,
        })),
      });

      if (isCancel(path)) {
        cancel("Cancelled download");
        process.exit(0);
      }
    }
    downloadAsset(path);
  }
}

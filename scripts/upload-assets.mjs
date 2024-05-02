import "zx/globals";
import crypto from "node:crypto";
import fs from "node:fs";
import { writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import manifest from "../cloud-assets/manifest.json" assert { type: "json" };

const hashFile = (path) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(path);

    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });

/**
 *  Uploads a file from the cloud-assets directory to the docs-assets bucket in R2
 * @param filePath {string} - The path to a file in the cloud-assets directory
 */
export default async function uploadAsset(filePath) {
  const asset = filePath.startsWith("cloud-assets")
    ? filePath
    : join("cloud-assets", filePath);
  const ext = extname(filePath);
  return hashFile(asset).then(async (hash) => {
    const file = filePath.replace("cloud-assets/", "");
    const hashFile = hash + ext;

    if (manifest.assets[file] === hashFile) {
      console.log("File already uploaded");
      process.exit(0);
    }

    await $`wrangler r2 object put docs-assets/${hashFile} --file=${asset}`;
    await writeFile(
      "cloud-assets/manifest.json",
      JSON.stringify(
        {
          assets: {
            ...manifest.assets,
            [file]: hashFile,
          },
        },
        null,
        2
      )
    );
  });
}

// Check if module is main
if (import.meta.url.startsWith("file:")) {
  const modulePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    const path = process.argv[2];
    if (!path) {
      throw new Error(
        "Must specifiy a file in the cloud-assets directory to upload"
      );
    }
    await uploadAsset(path);
  }
}

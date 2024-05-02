/**
 * This file is responsible for serving files from R2 or locally during development
 *
 * During production we don't actually want this route to be called at all. What we really want
 * is for a rewrite rule to trigger that points to the CDN directly.
 *
 * TODO: Write a script that syncs the contents of the `cloud-assets` directory with the CDN
 */

import type { APIRoute } from "astro";
import type { ReadStream } from "node:fs";
import manifest from "cloud-assets/manifest.json";

export const prerender = false;

async function* nodeStreamToIterator(stream: ReadStream) {
  for await (const chunk of stream) {
    yield chunk;
  }
}

function iteratorToStream(iterator: AsyncGenerator<ReadStream, void, unknown>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(new Uint8Array(value as any));
      }
    },
  });
}

async function staticFileResponse(filePath: string) {
  const fs = await import("fs");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileStream = fs.createReadStream(filePath);
  const iterator = nodeStreamToIterator(fileStream);
  const readableStream = iteratorToStream(iterator);
  console.log("reading file from fs");
  return new Response(readableStream, {
    status: 200,
    headers: {
      "X-Location": "static file",
      // @ts-expect-error
      "Content-Type": mime.getType(filePath) || "application/octet-stream",
    },
  });
}

export const GET: APIRoute = async ({ redirect, url }) => {
  // TODO: This should be updated to be a custom URL
  const ASSET_PREFIX = "https://pub-9f5707ce32c7495d9687b939883b271d.r2.dev";
  const asset_url = `${ASSET_PREFIX}/${
    manifest.assets[url.pathname.replace("/cloud-assets/", "")]
  }`;

  // During development we want to iterate on asset files locally
  //
  // If assets are used that aren't stored locally, we'll download them
  // from the CDN and add them to the `/cloud-assets` directory
  if (process.env.NODE_ENV === "development") {
    const localPath = "." + url.pathname;

    let res = await staticFileResponse(localPath);
    if (res) return res;

    const [{ writeFile }, { Readable }] = await Promise.all([
      import("node:fs/promises"),
      import("node:stream"),
    ]);
    const response = await fetch(asset_url);
    if (response.status > 300) {
      return new Response("Failed to download file", {
        status: response.status,
      });
    }
    const body = Readable.fromWeb(response.body as any);
    await writeFile(localPath, body);
  }

  // In production let's pull directly from the CDN
  // Preferably this isn't called at all and is just handled by a rewrite rule
  return redirect(asset_url);
};
